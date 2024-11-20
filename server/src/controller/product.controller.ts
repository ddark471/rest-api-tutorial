import {Request, Response} from "express"
import { createProductInput, updateProductInput } from "../schema/product.schema.js";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service.js";

export async function createProductHandler(req: Request<{}, {}, createProductInput["body"]>, res: Response) {
    const userId = res.locals.user._id;

    const body = req.body

    const product = await createProduct({
        ...body, 
        user: userId,
        title: body.title ? body.title : ""
    })

    return res.send(product)
}

export async function updateProductHandler(req: Request<updateProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id;

    const productId = req.params.productId

    const update = req.body

    const product = await findProduct({ _id: productId })                //trying to find product according to the productId 

    if(!product){
        return res.sendStatus(404)
    }

    if(product.user !== userId){
        return res.sendStatus(403)
    }

    const updatedProduct = await findAndUpdateProduct({ _id: productId }, update, {new: true})

    res.send(updatedProduct)
}

export async function deleteProductHandler(req: Request<updateProductInput["params"]>, res: Response){
    const userId = res.locals.user._id
    const productId = req.params.productId
    const product = await findProduct({_id: productId})

    if(!product) return res.sendStatus(404)
    if(product.user !== userId) return res.sendStatus(403)

    await deleteProduct({_id: productId});

    return res.sendStatus(200)
}

export async function getProductHandler(req: Request<updateProductInput["params"]>, res: Response){
    const productId = req.params.productId
    const product = await findProduct({_id: productId})

    if(!product) return res.sendStatus(404)

    return res.send(product)
}
