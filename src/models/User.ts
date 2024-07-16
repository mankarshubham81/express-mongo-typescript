import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser, Document {

}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlenght: 30
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlenght: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlenght: 1024,
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
