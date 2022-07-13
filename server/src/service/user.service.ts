import { DocumentDefinition, FilterQuery, ObjectIdSchemaDefinition, ObjectId } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';
import { Request, Response } from 'express'

export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword' | 'userTasks'>>) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        const user = await UserModel.create(input)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return omit(user.toJSON(), 'password');
    } catch (e: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(e)
    }
}

export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await UserModel.findOne({ email })

    if (!user) {
        return false
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isValid = await user.comparePassword(password);
    if (!isValid) return false

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return omit(user.toJSON(), 'password');
}

export async function getUsers() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await UserModel.find()
    } catch (e: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(e)
    }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return UserModel.findOne(query).lean();
    } catch (e: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(e)
    }
}

type userTasks = {
    id?: string | null,
    originalTaskId: ObjectId | undefined,
    title?: string,
    start?: string | Date,
    end?: string | Date,
    allDay?: boolean,
    isAllDay?: boolean,
    resourceId?: string | null,
    backgroundColorClass?: string,
    isNew?: boolean,
    toBeDeleted?: boolean,
}

export async function updateUserTasks(query: FilterQuery<UserDocument>, req: Request) {
    UserModel.findOne(query, (err: Error, doc: UserDocument) => {
        //const existingTasks = doc.userTasks
        const currentStateTasks = req.body.userTasks
        const filteredTasks = currentStateTasks.filter((x: userTasks) => !x.toBeDeleted)
        doc.userTasks = filteredTasks
        doc.save()
    });
}