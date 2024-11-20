var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import lodash from "lodash";
import UserModel from "../models/user.model.js";
export function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserModel.create(input);
            return user;
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
export function validatePassword(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password }) {
        const user = yield UserModel.findOne({ email });
        if (!user)
            return false;
        const isValid = yield user.comparePassword(password);
        if (!isValid)
            return false;
        return lodash.omit(user.toJSON(), "password");
    });
}
export function findUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return UserModel.findOne(query).lean();
    });
}
