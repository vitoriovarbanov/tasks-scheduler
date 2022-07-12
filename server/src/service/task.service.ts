import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import TaskModel, { TaskDocument } from "../models/task.model";


export async function createTask() {
    return TaskModel.create({
        name: 'Test Task 0001'
    })
}