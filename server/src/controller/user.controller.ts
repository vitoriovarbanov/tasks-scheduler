import { userTasksType } from './../models/user.model';
import { Request, Response } from 'express'
import { CreateUserInput } from '../schema/user.schema';
import { createUser, getUsers, updateUserTasks } from '../service/user.service';
import logger from '../utils/logger';
import { omit } from 'lodash';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response){
    try{
        const user = await createUser(req.body)
        return res.status(200).send(omit(user.toJSON(), "password"))
    }catch(e: any){
        logger.error(e)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(409).send(e.message)
    }
}

export async function getUsersHandler(_req: Request, res: Response){
    try{
        const users = await getUsers()
        const mappedUsers = users.map((x: { name: string, email: string, role: string, _id: any, userTasks?: userTasksType })=>{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { name: x.name, email: x.email, role: x.role, userTasks: x.userTasks, id: x._id }
        })
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(mappedUsers));
    }catch(e: any){
        logger.error(e)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(409).send(e.message)
    }
}

export async function updateUserTasksHandler(req: Request, res: Response){
    try{
        await updateUserTasks({ _id: req.params.id }, req)
        return res.sendStatus(200)        
    }catch(e: any){
        logger.error(e)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(409).send(e.message)
    }
}