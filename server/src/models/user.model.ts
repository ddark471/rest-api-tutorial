import bcrypt from "bcrypt"
import { NextFunction } from "express";
import { createRequire } from "module";
import mongoose, { Schema, Document } from "mongoose";
import * as dotenv from "dotenv"
import config from "config"

export interface UserInput {
    email: string;
    name: string;
    password: string;
    image: string;
}

export interface UserDocument extends UserInput, Document{
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

dotenv.config({path: ".env"});
const userSchema: Schema = new Schema(
    {   
        email: {type: String, require: true, unique: true},
        name: {type: String, require: true},
        password: {type: String, require: true},
        image: {type: String}
    },{
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    let user = this as unknown as UserDocument; // Explicitly casting 'this' to UserDocument
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"))
    const hash = await bcrypt.hashSync(user.password, salt)
    user.password = hash;

    return next();
})

userSchema.methods.comparePassword = async function(candidatePassword: string):Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(e => false)
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel