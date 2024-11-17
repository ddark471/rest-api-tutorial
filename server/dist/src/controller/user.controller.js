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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = createUserHandler;
exports.deleteUserHandler = deleteUserHandler;
exports.getUserDetailsHandler = getUserDetailsHandler;
exports.getAllUsers = getAllUsers;
const logger_1 = __importDefault(require("../utils/logger"));
const user_sevice_1 = require("../service/user.sevice");
const user_model_1 = __importDefault(require("../models/user.model"));
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            if (!imagePath)
                throw new Error("Image path is requred");
            if (imagePath)
                imagePath = imagePath.replace(/\\/g, "/");
            const userData = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                image: imagePath
            };
            const user = yield (0, user_sevice_1.createUser)(userData);
            return res.send(user.toJSON());
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send(e.message);
        }
    });
}
function deleteUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const user = yield user_model_1.default.findById(userId);
            if (!user) {
                return res.status(404).send("User Not Found");
            }
            logger_1.default.info("user found");
            yield user.deleteOne();
            return res.status(200).json({ message: "User has been sucessfully deleted" });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getUserDetailsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield res.locals.user;
        console.log(user);
        if (user) {
            return res.send(user);
        }
        else {
            return res.sendStatus(409);
        }
    });
}
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.default.find();
            return res.status(200).json(users);
        }
        catch (err) {
            console.error("Couldn't fetch users", err);
            return res.status(500);
        }
    });
}
