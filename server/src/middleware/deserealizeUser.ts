import lodash from "lodash"
import { Request, Response, NextFunction } from "express"
import { verifyJwt } from "../utils/jwt.utils.js"
import logger from "../utils/logger.js"
import { reIssueAccessToken } from "../service/session.service.js"

 const deserealizeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = lodash.get(req, "headers.authorization", "").replace(/^Bearer\s/, "")      //replacing bearer word in bearer token with emty string
    let refreshToken = lodash.get(req, "headers.x-refresh", "")

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