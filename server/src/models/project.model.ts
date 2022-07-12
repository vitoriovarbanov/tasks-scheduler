import { TaskDocument, tasksSchema } from './task.model';
import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from 'nanoid';

//const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

export interface ProjectDocument extends mongoose.Document {
    name: string,
    tasks: TaskDocument['_id'][],
    team:  UserDocument['_id'][],
    createdAt: Date,
    updatedAt: Date,
}


const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: tasksSchema }],
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
}, {
    timestamps: true
});


const ProjectModel = mongoose.model<ProjectDocument>("Projects", projectSchema);

export default ProjectModel