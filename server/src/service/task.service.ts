import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import TaskModel, { TaskDocument } from "../models/task.model";


export async function createTask(input: DocumentDefinition<Omit<TaskDocument, 'createdAt' | 'updatedAt' >>) {
    return TaskModel.create(input)
}
