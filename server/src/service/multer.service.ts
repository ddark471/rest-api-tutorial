import { createRequire } from "module";
import * as path from "path";

const require = createRequire(import.meta.url);
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
        cb(null, "./profileImage")        //path where images will be stored
    },
    filename: (req:any, file:any, cb:any) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true)
    }   else{   
        cb(new Error("Only images are allowed"))
    }
}

export const uploadImage = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 1024 * 1024 * 5}
})