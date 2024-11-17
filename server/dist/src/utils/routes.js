"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const user_schema_1 = require("../schema/user.schema");
const session_controller_1 = require("../controller/session.controller");
const session_schema_1 = require("../schema/session.schema");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const deserealizeUser_1 = __importDefault(require("../middleware/deserealizeUser"));
const product_schema_1 = require("../schema/product.schema");
const product_controller_1 = require("../controller/product.controller");
const multer_service_1 = require("../service/multer.service");
const user_controller_2 = require("../controller/user.controller");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function routes(app) {
    app.post("/api/users", multer_service_1.uploadImage.single("image"), (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler); //post api endpoint for creating users
    app.get("/api/users/profileImage/:imageName", deserealizeUser_1.default, (req, res) => {
        const imageName = req.params.imageName;
        const imagePath = path_1.default.join(__dirname, "../../profileImage", imageName);
        fs_1.default.access(imagePath, fs_1.default.constants.F_OK, (err) => {
            if (err) {
                console.error(err);
                return res.status(404).send("Profile Image Not Found");
            }
            res.sendFile(imagePath);
        });
    });
    app.delete("/api/users/:userId", deserealizeUser_1.default, user_controller_1.deleteUserHandler);
    app.get("/api/users/all", deserealizeUser_1.default, user_controller_2.getAllUsers);
    app.get("/api/users/details", deserealizeUser_1.default, user_controller_1.getUserDetailsHandler);
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createSessionHandler); //post api endpoint for creating user sessions
    app.get("/api/sessions", deserealizeUser_1.default, requireUser_1.default, session_controller_1.getUserSessionsHandler); //get api endpoint for getting all user sessions
    app.delete("/api/sessions", deserealizeUser_1.default, requireUser_1.default, session_controller_1.deleteSessionHandler);
    app.post("/api/products", deserealizeUser_1.default, requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema), product_controller_1.createProductHandler);
    app.put("/api/products", deserealizeUser_1.default, requireUser_1.default, (0, validateResource_1.default)(product_schema_1.updateProductSchema), product_controller_1.updateProductHandler);
    app.get("/api/products", (0, validateResource_1.default)(product_schema_1.getProductSchema), product_controller_1.getProductHandler);
    app.delete("/api/products", deserealizeUser_1.default, requireUser_1.default, (0, validateResource_1.default)(product_schema_1.deleteProductSchema), product_controller_1.deleteProductHandler);
}
exports.default = routes;
