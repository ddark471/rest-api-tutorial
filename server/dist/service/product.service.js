var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ProductModel from "../models/product.model.js";
export function createProduct(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return ProductModel.create(input);
    });
}
export function findProduct(query_1) {
    return __awaiter(this, arguments, void 0, function* (query, options = { lean: true }) {
        return ProductModel.findOne(query, {}, options);
    });
}
export function findAndUpdateProduct(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return ProductModel.findOneAndUpdate(query, update, options);
    });
}
export function deleteProduct(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return ProductModel.deleteOne(query);
    });
}
