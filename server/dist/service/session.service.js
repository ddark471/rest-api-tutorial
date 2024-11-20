var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SessionModel from "../models/session.model.js";
import { signJwt, verifyJwt } from "../utils/jwt.utils.js";
import lodash from "lodash";
import { findUser } from "./user.sevice.js";
import config from "config";
export function createSession(userId, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield SessionModel.create({ user: userId, userAgent });
        return session.toJSON();
    });
}
export function findSessions(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return SessionModel.find().lean(); //.lean method checks for objects being JS or mongoose object
    });
}
export function updateSession(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        return SessionModel.updateOne(query, update);
    });
}
export function reIssueAccessToken(_a) {
    return __awaiter(this, arguments, void 0, function* ({ refreshToken }) {
        const { decoded } = verifyJwt(refreshToken);
        if (!decoded || !lodash.get(decoded, "session"))
            return false;
        const session = yield SessionModel.findById(lodash.get(decoded, "session"));
        if (!session || !session.valid)
            return false;
        const user = yield findUser({ _id: session.user });
        if (!user)
            return false;
        const accessToken = signJwt(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config.get("accessTokenTtl") });
        return accessToken;
    });
}
