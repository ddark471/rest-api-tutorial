import jwt from "jsonwebtoken"
import c from "config"
import * as dotenv from "dotenv"

dotenv.config({path: ".env"})

const publicKey = process.env.PUBLICKEY || "";
const privateKey = process.env.PRIVATEKEY || "";

export function signJwt(object: Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, {
        ...(options && options),        //checking for options being undefined
        algorithm: "RS512"
    })
}

export function verifyJwt(token: string){
    try{
        const decoded = jwt.verify(token, publicKey, {algorithms: ["RS512"]})
        return {
            valid: true,
            expired: false,
            decoded,
        }
    }   catch(e: any){
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}