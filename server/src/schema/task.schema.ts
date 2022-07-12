import { object, string } from 'zod';

export const createTaskSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' })
    })
})