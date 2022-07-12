import { createSessionSchema } from './schema/session.schema';
import { Express, Request, Response } from 'express';
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createUserHandler, getUsersHandler } from './controller/user.controller';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { requireUser } from './middleware/requireUser';
import { createProjectHandler, getAllProjectHandler } from './controller/project.controller';
import { createTaskHandler } from './controller/task.controller';
import { createTaskSchema } from './schema/task.schema';

function routes(app: Express) {
    app.get('/api/users', getUsersHandler);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    app.post('/api/users', validateResource(createUserSchema), createUserHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler);

    app.get('/api/sessions', requireUser, getUserSessionsHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    // PROJECTS

    app.post('/api/projects', createProjectHandler);

    app.get('/api/projects', getAllProjectHandler);

    // TASKS
    app.post('/api/tasks', validateResource(createTaskSchema) ,createTaskHandler);


}

export default routes;