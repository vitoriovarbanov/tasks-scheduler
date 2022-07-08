import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validate = (schema: AnyZodObject) => (req: Request, res: Response, _next: NextFunction) => {
    try {
        schema.parse({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            body: req.body,
            query: req.query,
            params: req.params,
        });
    } catch (err: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return res.status(400).send(err.errors);
    }
};

export default validate;