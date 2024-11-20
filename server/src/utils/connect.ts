import logger from "./logger.js"
import c from "config";
import { createRequire } from "node:module";

async function connect (){
    const dbUri = "mongodb+srv://ddarkk471:j0Lj24tVY6VRw5xQ@cluster0.7u6hh.mongodb.net/qahva"
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