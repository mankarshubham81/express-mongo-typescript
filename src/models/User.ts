import mongoose, { Document, Schema } from "mongoose";
import jwt from 'jsonwebtoken';
export interface IUser {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    generateAuthToken: () => string;
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
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    {
        versionKey: false
    }
);

UserSchema.methods.generateAuthToken = function () {
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY?.toString() || '';
    const token = jwt.sign({ _id: this._id, name: this.name, isAdmin: this.isAdmin }, jwtPrivateKey);
    return token;
};

export default mongoose.model<IUserModel>('User', UserSchema);
