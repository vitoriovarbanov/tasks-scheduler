import { UserDocument } from './../models/user.model';
import { Request, Response } from 'express'
import { CreateUserInput } from '../schema/user.schema';
import { createSession } from '../service/session.service';
import logger from '../utils/logger';
import { omit } from 'lodash';

// eslint-disable-next-line @typescript-eslint/ban-types
/* export async function createSessionHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response){
    try{
        //const session = await createSession(req._id)
       // return res.status(200).send(omit(user.toJSON(), "password"))
    }catch(e: any){
        logger.error(e)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(409).send(e.message)
    }
} */