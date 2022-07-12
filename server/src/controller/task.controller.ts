import { Request, Response } from 'express';
import { createTask } from '../service/task.service';

export async function createTaskHandler(req: Request, res: Response) {
    try {
        const body = req.body
        const project = await createTask(body);
        return res.send(project)
    } catch (e: any) {
        console.log(e)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(409).send(e.message)
    }
}

