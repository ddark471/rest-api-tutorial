import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    console.log(user)
    console.log(res.locals)

    logger.info(user)

    if(!user){ 
        return res.sendStatus(403)
    };

    return next();
}

export default requireUser;