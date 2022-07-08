import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

interface HookNextFunction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error?: Error): any
}

export interface UserDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},

}, {
    timestamps: true
});

userSchema.pre("save", async function(next: HookNextFunction){
    const user = this as UserDocument

    if(!user.isModified('password')){
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

const UserModel = mongoose.model("User", userSchema);

export default UserModel