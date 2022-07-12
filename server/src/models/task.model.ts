import mongoose from "mongoose";

export interface TaskDocument extends mongoose.Document {
    name: string,
    createdAt: Date,
    updatedAt: Date,
}

export const tasksSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
})


const TaskModel = mongoose.model<TaskDocument>("Task", tasksSchema);

export default TaskModel