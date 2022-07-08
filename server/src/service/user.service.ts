import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';

export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>){
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        const user = await UserModel.create(input)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return omit(user.toJSON(), 'password');
    }catch(e: any){
       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
       throw new Error(e)
    }
}

export async function validatePassword({email, password} : {email: string, password: string}){
   const user = await UserModel.findOne({email})

   if(!user){
    return false
   }

   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   const isValid = await user.comparePassword(password);
   if(!isValid) return false

   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
   return omit(user.toJSON(), 'password');
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