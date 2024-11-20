var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validatePassword } from "../service/user.sevice.js";
import { createSession, findSessions, updateSession } from "../service/session.service.js";
import config from "config";
import { signJwt } from "../utils/jwt.utils.js";
export function createSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield validatePassword(req.body);
        if (!user)
            return res.status(401).send("Invalid email or password");
        const session = yield createSession(user._id.toString(), req.get("user-agent") || "");
        const accessToken = signJwt(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config.get("accessTokenTtl") } //Time to live for access token
        );
        const refreshToken = signJwt(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config.get("refreshTokenTtl") } //Time to live for refresh token
        );
        return res.send(Object.assign({ accessToken, refreshToken }, user));
    });
}
export function getUserSessionsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const sessions = yield findSessions({ user: userId, valid: true });
        return res.send(sessions);
    });
}
export function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        yield updateSession({ _id: sessionId }, { valid: false });
        return res.send({
            accessToken: null,
            refreshToken: null
        });
    });
}
