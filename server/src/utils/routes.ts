import {Express, Request, Response} from "express"
import { createUserHandler, deleteUserHandler, getUserDetailsHandler } from "../controller/user.controller.js";
import validateResource from "../middleware/validateResource.js";
import { createUserSchema } from "../schema/user.schema.js";
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "../controller/session.controller.js";
import { createSessionSchema } from "../schema/session.schema.js";
import requireUser from "../middleware/requireUser.js";
import deserealizeUser from "../middleware/deserealizeUser.js";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "../schema/product.schema.js";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller.js";
import { uploadImage } from "../service/multer.service.js";
import { getAllUsers } from "../controller/user.controller.js";
import * as path from "path";
import * as fs from "fs";
import UserModel from "../models/user.model.js";

function routes(app: Express){
    app.get("/_ah/ready", (req: Request, res: Response) => res.status(200).send("OK"))
    app.post("/api/users",   uploadImage.single("image"),  validateResource(createUserSchema), createUserHandler)       //post api endpoint for creating users

    app.get("/api/users/profileImage/:imageName", deserealizeUser,  (req: Request, res: Response) => {
        const imageName = req.params.imageName;
        const imagePath = path.join(__dirname, "../../profileImage", imageName);

        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if(err){
                return res.status(404).send("Profile Image Not Found")
            }

            res.sendFile(imagePath)
        })
    } )

    app.delete("/api/users/:userId", deserealizeUser,deleteUserHandler)

    app.get("/api/users/all", deserealizeUser, getAllUsers)

    app.get("/api/users/details", deserealizeUser, getUserDetailsHandler);  

    app.post("/api/sessions",  validateResource(createSessionSchema), createSessionHandler)      //post api endpoint for creating user sessions

    app.get("/api/sessions", deserealizeUser, requireUser, getUserSessionsHandler);         //get api endpoint for getting all user sessions

    app.delete("/api/sessions", deserealizeUser, requireUser, deleteSessionHandler)

    app.post("/api/products", deserealizeUser, requireUser, validateResource(createProductSchema), createProductHandler)

    app.put("/api/products", deserealizeUser, requireUser, validateResource(updateProductSchema), updateProductHandler)
    
    app.get("/api/products", validateResource(getProductSchema), getProductHandler)
    
    app.delete("/api/products", deserealizeUser, requireUser, validateResource(deleteProductSchema), deleteProductHandler)

}

export default routes;  