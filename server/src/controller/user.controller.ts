import { Request, Response } from "express";
import logger from "../utils/logger.js";
import { createUser } from "../service/user.sevice.js";
import { CreateUserInput } from "../schema/user.schema.js";
import UserModel, { UserInput } from "../models/user.model.js";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response){
    try{
        let imagePath = req.file?.path;
        if(!imagePath) throw new Error("Image path is requred")
        if(imagePath) imagePath = imagePath.replace(/\\/g, "/")
        const userData:UserInput = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            image: imagePath
        }
        const user = await createUser(userData);
        return res.send(user.toJSON());
    }   catch(e: any){
        return res.status(409).send(e.message)
    }
}

export async function deleteUserHandler(req: Request, res: Response){
    const {userId} = req.params
    try{
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(404).send("User Not Found")
        }
        await user.deleteOne();
        return res.status(200).json({message: "User has been sucessfully deleted"})
    }   catch(err){ 
            console.error(err)
            return res.status(500).json({message: "Internal Server Error"})
        }
}

export async function getUserDetailsHandler(req: Request, res: Response){
    const user = await res.locals.user;

    if(user){
        return res.send(user);
    }   else{
        return res.sendStatus(409)
    }
}

export async function getAllUsers(req: Request, res: Response){
    try{
        const users = await UserModel.find();
        return res.status(200).json(users)
    }   
    catch(err){
        console.error("Couldn't fetch users", err)
        return res.status(500);
    }
}