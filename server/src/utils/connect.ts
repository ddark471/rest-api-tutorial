import logger from "./logger.js"
import c from "config";
import * as dotenv from "dotenv"
import { createRequire } from "node:module";

async function connect (){
    dotenv.config();
    const dbUri = process.env.dbUri || ""
    const require = createRequire(import.meta.url);
    const mongoose = require("mongoose")
    try{
        await mongoose.connect(dbUri)
    }   catch(err){
            console.error(err)
            process.exit(1)
        }
}

export default connect