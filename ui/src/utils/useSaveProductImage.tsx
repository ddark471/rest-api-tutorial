import { useMutation } from "@tanstack/react-query"
import { saveProductImage } from "../services/saveProductImage"

export const useSaveProductImage = () => {
    const mutation = useMutation({
        mutationKey: ["SaveProductImage"],
        mutationFn: (productImage: File) => 
            { 
                console.log(productImage) 
                return saveProductImage(productImage

            )} 
    })

    return mutation;
}
