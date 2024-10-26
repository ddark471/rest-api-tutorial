import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.sevice";
import { CreateUserInput } from "../schema/user.schema";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response){
    try{
        const imagePath = req?.file?.path;
        const userData = {...req.body, imagePath}
        const user = await createUser(userData);
        return res.send(user.toJSON());
    }   catch(e: any){
        logger.error(e)
        return res.status(409).send(e.message)
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