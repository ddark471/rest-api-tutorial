import jwt from "jsonwebtoken";
import { config } from "dotenv";
// const publicKey = config.get<string>("publicKey")
// const privateKey = config.get<string>("privateKey")
// const publicKey = config.get<string>("publicKey")
// const privateKey = config.get<string>("privateKey")
config();
const publicKey = process.env.publicKey || "";
const privateKey = process.env.privateKey || "";
export function signJwt(object, options) {
    return jwt.sign(object, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS512" }));
}
export function verifyJwt(token) {
    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS512"] });
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        };
    }
}
