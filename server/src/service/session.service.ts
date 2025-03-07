import { FilterQuery, FlattenMaps, UpdateQuery } from "mongoose";
import SessionModel, {SessionDocument} from "../models/session.model.js";
import { signJwt, verifyJwt } from "../utils/jwt.utils.js";
import lodash from "lodash";
import { Session } from "inspector/promises";
import { findUser } from "./user.sevice.js";
import config from "config"

export async function createSession(userId: string, userAgent: string){
    const session = await SessionModel.create({ user: userId, userAgent});

    return session.toJSON();    
}

export async function findSessions(query: FilterQuery<SessionDocument>){
    return SessionModel.find().lean();      //.lean method checks for objects being JS or mongoose object
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>){
    return SessionModel.updateOne(query, update)
}

export async function reIssueAccessToken({refreshToken}: {refreshToken: string}){
    const {decoded} = verifyJwt(refreshToken);
    
    if(!decoded || !lodash.get(decoded, "session")) return false;

    const session = await SessionModel.findById(lodash.get(decoded, "session"))

    if(!session || !session.valid) return false;

    const user = await findUser({ _id: session.user})

    if(!user) return false;

    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")}
    )

    return accessToken;
}