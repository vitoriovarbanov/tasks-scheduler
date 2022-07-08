import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>){
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await UserModel.create(input)
    }catch(e: any){
       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
       throw new Error(e)
    }
}

export async function getUsers(){
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await UserModel.find()
    }catch(e: any){
       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
       throw new Error(e)
    }
}