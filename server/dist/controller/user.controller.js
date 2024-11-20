var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUser } from "../service/user.sevice.js";
import UserModel from "../models/user.model.js";
export function createUserHandler(req, res) {
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
            const user = yield createUser(userData);
            return res.send(user.toJSON());
        }
        catch (e) {
            return res.status(409).send(e.message);
        }
    });
}
export function deleteUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const user = yield UserModel.findById(userId);
            if (!user) {
                return res.status(404).send("User Not Found");
            }
            yield user.deleteOne();
            return res.status(200).json({ message: "User has been sucessfully deleted" });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
export function getUserDetailsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield res.locals.user;
        if (user) {
            return res.send(user);
        }
        else {
            return res.sendStatus(409);
        }
    });
}
export function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield UserModel.find();
            return res.status(200).json(users);
        }
        catch (err) {
            console.error("Couldn't fetch users", err);
            return res.status(500);
        }
    });
}
