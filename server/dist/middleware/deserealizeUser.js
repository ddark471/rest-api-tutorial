var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import lodash from "lodash";
import { verifyJwt } from "../utils/jwt.utils.js";
import { reIssueAccessToken } from "../service/session.service.js";
const deserealizeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = lodash.get(req, "headers.authorization", "").replace(/^Bearer\s/, ""); //replacing bearer word in bearer token with emty string
    let refreshToken = lodash.get(req, "headers.x-refresh", "");
    if (!accessToken)
        return next();
    const { decoded, expired } = verifyJwt(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (Array.isArray(refreshToken)) {
        refreshToken = refreshToken.join("");
    }
    if (expired && refreshToken) {
        const newAcessToken = yield reIssueAccessToken({ refreshToken });
        if (newAcessToken !== "" && newAcessToken !== false) {
            res.setHeader("x-access-token", newAcessToken);
        }
        const result = verifyJwt(newAcessToken.toString());
        res.locals.user = result;
        return next();
    }
    return next();
});
export default deserealizeUser;
