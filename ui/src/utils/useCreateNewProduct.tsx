import { useMutation } from "@tanstack/react-query"
import { createNewProduct } from "../services/createNewProduct"
import { ProductProps } from "../interfaces"

export const useCreateNewProduct = () => {
    const newProduct = useMutation({
        mutationKey: ["CreateNewProduct"],
        mutationFn: ({productNameRu, productNameUz, descriptionRu, descriptionUz, available_volumes, productPrice, category, image, productSlug, is_active}:ProductProps) => createNewProduct({productNameRu, productNameUz, descriptionRu, descriptionUz, available_volumes, productPrice, category, image, productSlug, is_active})
    })

    return newProduct;
}
