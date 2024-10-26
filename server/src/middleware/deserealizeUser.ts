import {get} from "lodash"
import { Request, Response, NextFunction } from "express"
import { verifyJwt } from "../utils/jwt.utils"
import logger from "../utils/logger"
import { reIssueAccessToken } from "../service/session.service"

 const deserealizeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")      //replacing bearer word in bearer token with emty string
    let refreshToken = get(req, "headers.x-refresh", "")

    console.log(accessToken)

    if(!accessToken) return next();

    const {decoded, expired} = verifyJwt(accessToken);

    if(decoded) {
        res.locals.user = decoded;
        return next();
    }   

    if(Array.isArray(refreshToken)){
        refreshToken = refreshToken.join("")
    }

    if(expired && refreshToken){
        const newAcessToken = await reIssueAccessToken({refreshToken})

        if(newAcessToken !== "" && newAcessToken !== false){
            res.setHeader("x-access-token", newAcessToken)
        }

        const result = verifyJwt(newAcessToken.toString())

        res.locals.user = result

        return next();
    }

    return next();

}

export default deserealizeUser