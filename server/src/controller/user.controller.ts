import { UserDocument } from './../models/user.model';
import { Request, Response } from 'express'
import { CreateUserInput } from '../schema/user.schema';
import { createUser, getUsers } from '../service/user.service';
import logger from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response){
    try{
        const user = await createUser(req.body)
        return user;
    }catch(e: any){
        logger.error(e)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(409).send(e.message)
    }
}

export async function getUsersHandler(_req: Request, res: Response){
    try{
        const users = await getUsers()
        const mappedUsers = users.map((x: { name: string, email: string, role: string })=>{
            return { name: x.name, email: x.email, role: x.role }
        })
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(mappedUsers));
    }catch(e: any){
        logger.error(e)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(409).send(e.message)
    }
}