import { Request, Response } from 'express';
import { createProject, getAllProjects } from '../service/projects.service';
import ProjectModel from '../models/project.model';
import TaskModel from '../models/task.model';

export async function createProjectHandler(req: Request, res: Response) {
    try {
        const body = req.body
        const project = await createProject(body);
        return res.send(project)
    } catch (e: any) {
        console.log(e)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(409).send(e.message)
    }
}

export async function deleteProjecHandler(req: Request, res: Response) {

}

export async function getAllProjectHandler(_req: Request, res: Response) {
    ProjectModel.
        find({})
        .populate({
            path: "tasks",
            model: TaskModel,
            select: "name",
        })
        .exec()
        .then(projects => {
            if (!projects) {
                return res.status(404).json({
                    message: "Projects not found"
                });
            }
            res.status(200).json({
                projects: projects,
                request: {
                    type: "GET",
                    url: "http://localhost:1337/api/projects"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}