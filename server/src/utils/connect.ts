import mongoose from "mongoose";
import config from "config"
import logger from "./logger"

async function connect (){
    const dbUri = config.get<string>("dbUri")
    
    try{
        await mongoose.connect(dbUri)
        logger.info("Succesfully connected")       
    }   catch(err){
            logger.error("Failed to connect", err)
            process.exit(1)
        }
}

export default connect