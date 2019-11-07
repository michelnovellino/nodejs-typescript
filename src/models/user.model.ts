import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    encrypt(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>
}
export interface IUserSaved {
    token: string;
    message: Message;
}

export interface Message {
    _id: string;
    username: string;
    email: string;
    password: string;
    __v: number;
}


const schema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 40,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

schema.methods.encrypt = async (password: string): Promise<string> => {
    const salt: string = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}
schema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
}

export default model<IUser>('User', schema);