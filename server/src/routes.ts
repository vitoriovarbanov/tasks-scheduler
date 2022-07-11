import { createSessionSchema } from './schema/session.schema';
import { Express, Request, Response } from 'express';
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createUserHandler, getUsersHandler } from './controller/user.controller';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { requireUser } from './middleware/requireUser';

function routes(app: Express){
    app.get('/api/users', getUsersHandler);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    app.post('/api/users', validateResource(createUserSchema) , createUserHandler);

    app.post('/api/sessions', validateResource(createSessionSchema) , createSessionHandler);

    app.get('/api/sessions', requireUser ,getUserSessionsHandler);

    app.delete('/api/sessions', requireUser , deleteSessionHandler);
}

export default routes;