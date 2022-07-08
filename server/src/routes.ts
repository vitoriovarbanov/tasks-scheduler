import { Express, Request, Response } from 'express';
import { createUserHandler, getUsersHandler } from './controller/user.controller';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express){
    app.get('/api/users', getUsersHandler);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    app.post('/api/users', validateResource(createUserSchema) , createUserHandler);
}

export default routes;