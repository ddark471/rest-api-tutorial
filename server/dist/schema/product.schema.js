import { object, number, string } from "zod";
const payload = {
    body: object({
        title: string({
            required_error: "Title is required"
        }),
        description: string({
            required_error: "Description is required"
        }).min(120, "Description must be at least 120 characters long"),
        price: number({
            required_error: "Price is required"
        }),
        image: string({
            required_error: "Image is required"
        })
    })
};
const params = {
    params: object({
        productId: string({
            required_error: "productId is required"
        })
    })
};
export const createProductSchema = object(Object.assign({}, payload));
export const updateProductSchema = object(Object.assign(Object.assign({}, payload), params));
export const deleteProductSchema = object(Object.assign({}, params));
export const getProductSchema = object(Object.assign({}, params));
