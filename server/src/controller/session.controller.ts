import { Request, Response } from "express";
import { validatePassword } from "../service/user.sevice";
import { createSession, findSessions, updateSession } from "../service/session.service";
import config from "config"
import {signJwt} from "../utils/jwt.utils"
import logger from "../utils/logger"

export async function createSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);
    logger.info(user)

    if(!user) return res.status(401).send("Invalid email or password")

    const session = await createSession(user._id.toString(),  req.get("user-agent") || "")
    
    const accessToken = signJwt(
        {...user, session: session._id},
        { expiresIn: config.get("accessTokenTtl")}      //Time to live for access token
    )

    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("refreshTokenTtl")}      //Time to live for refresh token
    )


    return res.send({accessToken, refreshToken, ...user})
}


export async function getUserSessionsHandler(req: Request, res: Response){
    const userId = res.locals.user._id
    
    const sessions = await findSessions({user: userId, valid: true})

    return res.send(sessions)
}   
 
export async function deleteSessionHandler(req: Request, res: Response){
    const sessionId = res.locals.user.session;

    await updateSession({_id: sessionId}, {valid: false})

    return res.send({
        accessToken: null,
        refreshToken: null
    })
}