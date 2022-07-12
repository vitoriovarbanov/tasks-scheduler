import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import ProjectModel, { ProjectDocument } from "../models/project.model";


export async function createProject(input: DocumentDefinition<Omit<ProjectDocument, 'createdAt' | 'updatedAt' >>) {
    return ProjectModel.create(input)
}

export async function getAllProjects(){
    return ProjectModel.find({})
}

export async function findProject(query: FilterQuery<ProjectDocument>, options: QueryOptions = { lean: true }) {
    return ProjectModel.findOne(query, {}, options);
}

export async function deleteProject(query: FilterQuery<ProjectDocument>){
    return ProjectModel.deleteOne(query);
}