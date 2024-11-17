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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductHandler = createProductHandler;
exports.updateProductHandler = updateProductHandler;
exports.deleteProductHandler = deleteProductHandler;
exports.getProductHandler = getProductHandler;
const product_service_1 = require("../service/product.service");
function createProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const product = yield (0, product_service_1.createProduct)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(product);
    });
}
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const update = req.body;
        const product = yield (0, product_service_1.findProduct)({ _id: productId }); //trying to find product according to the productId 
        if (!product) {
            return res.sendStatus(404);
        }
        if (product.user !== userId) {
            return res.sendStatus(403);
        }
        const updatedProduct = yield (0, product_service_1.findAndUpdateProduct)({ _id: productId }, update, { new: true });
        res.send(updatedProduct);
    });
}
function deleteProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = yield (0, product_service_1.findProduct)({ _id: productId });
        if (!product)
            return res.sendStatus(404);
        if (product.user !== userId)
            return res.sendStatus(403);
        yield (0, product_service_1.deleteProduct)({ _id: productId });
        return res.sendStatus(200);
    });
}
function getProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.productId;
        const product = yield (0, product_service_1.findProduct)({ _id: productId });
        if (!product)
            return res.sendStatus(404);
        return res.send(product);
    });
}
