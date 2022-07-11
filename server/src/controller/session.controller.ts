import { Request, Response } from 'express'
import { CreateUserInput } from '../schema/user.schema';
import { createSession, getSession, updateSession } from '../service/session.service';
import logger from '../utils/logger';
import { validatePassword } from '../service/user.service';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import config from 'config';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function createSessionHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        // Validate the user's password
        const user = await validatePassword(req.body)

        if (!user) {
            return res.status(401).send("Invalid email or password")
        }
        //Create session

        const session = await createSession(user._id, req.get('user-agent') || '');

        //Create an access token

        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get('accessTokenTtl') } //15 minutes
        )

        //Create a refresh token

        const refreshToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get('refreshTokenTtl') } //1y
        )

        res.send({ accessToken, refreshToken })

    } catch (e: any) {
        console.log(e)
        //logger.error(e)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(409).send(e.message)
    }
}

export async function getUserSessionsHandler(_req: Request, res: Response){
    const userId = res.locals.user._id;

    const sessions = await getSession({ user: userId, valid: true})

    return res.send(sessions);
}

export async function deleteSessionHandler(_req: Request, res: Response){
    const sessionId = res.locals.user.session;

    await updateSession({_id: sessionId}, { valid: false })

    return res.send({
        accessToken: null,
        refreshToken: null,
    })
}