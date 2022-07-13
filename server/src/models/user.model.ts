import mongoose, { ObjectId } from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';
import { tasksSchema } from './task.model'

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
});

export interface UserDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    role: string,
    userTasks?: {
        //[x: string]: any;
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
    }[],
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: string): Promise<boolean>,
}

export type userTasksType = {
        id?: string | null,
        originalTaskId: ObjectId | undefined,
        title?: string,
        start?: string | Date,
        end?: string | Date,
        allDay?: boolean,
        isAllDay?: boolean,
        resourceId?: string | null,
        backgroundColorClass?: string
        isNew?: boolean,
        toBeDeleted?: boolean,
}[]

const userTaskSchema = new mongoose.Schema({
    originalTaskId: { type: mongoose.Schema.Types.ObjectId, ref: 'task' },
    title: { type: String },
    start: { type: String },
    end: { type: String },
    allDay: { type: Boolean },
    isAllDay: { type: Boolean },
    resourceId: { type: String },
    backgroundColorClass: { type: String }
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    userTasks: [userTaskSchema]
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    const user = this as UserDocument

    if (!user.isModified('password')) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return next();
    }

    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const hash = await bcrypt.hashSync(user.password, salt)
    user.password = hash
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return next()
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel