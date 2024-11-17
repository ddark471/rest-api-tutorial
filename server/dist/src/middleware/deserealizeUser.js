"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
const session_service_1 = require("../service/session.service");
const deserealizeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, ""); //replacing bearer word in bearer token with emty string
    let refreshToken = (0, lodash_1.get)(req, "headers.x-refresh", "");
    console.log(accessToken);
    if (!accessToken)
        return next();
    const { decoded, expired } = (0, jwt_utils_1.verifyJwt)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (Array.isArray(refreshToken)) {
        refreshToken = refreshToken.join("");
    }
    if (expired && refreshToken) {
        const newAcessToken = yield (0, session_service_1.reIssueAccessToken)({ refreshToken });
        if (newAcessToken !== "" && newAcessToken !== false) {
            res.setHeader("x-access-token", newAcessToken);
        }
        const result = (0, jwt_utils_1.verifyJwt)(newAcessToken.toString());
        res.locals.user = result;
        return next();
    }
    return next();
});
exports.default = deserealizeUser;
