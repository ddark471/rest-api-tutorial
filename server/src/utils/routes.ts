import {Express, Request, Response} from "express"
import { createUserHandler, getUserDetailsHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";
import requireUser from "../middleware/requireUser";
import deserealizeUser from "../middleware/deserealizeUser";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "../schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller";
import { uploadImage } from "../service/multer.service";

function routes(app: Express){
    app.post("/api/users",   uploadImage.single("image"),  validateResource(createUserSchema), createUserHandler)       //post api endpoint for creating users

    app.get("/api/users/details", deserealizeUser, getUserDetailsHandler);  
    
    app.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler)      //post api endpoint for creating user sessions

    app.get("/api/sessions", deserealizeUser, requireUser, getUserSessionsHandler);         //get api endpoint for getting all user sessions

    app.delete("/api/sessions", deserealizeUser, requireUser, deleteSessionHandler)

    app.post("/api/products", deserealizeUser, requireUser, validateResource(createProductSchema), createProductHandler)

    app.put("/api/products", deserealizeUser, requireUser, validateResource(updateProductSchema), updateProductHandler)
    
    app.get("/api/products", validateResource(getProductSchema), getProductHandler)
    
    app.delete("/api/products", deserealizeUser, requireUser, validateResource(deleteProductSchema), deleteProductHandler)

}

export default routes;  