import { Product } from "../interfaces"
import { createNewProduct } from "../services/createNewProduct"
import { useMutation } from "@tanstack/react-query"

export const useCreateProduct = () => {
    // const product = useMutation({
    //     mutationKey: ["NewProduct"],
    //     mutationFn: ({title, price, description, image}: Product) => createNewProduct({title, price, description, image})
    // })

    return ""
}
