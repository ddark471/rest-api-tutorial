import { useQuery } from "@tanstack/react-query"
import { deleteProduct } from "../services/deleteProduct"

export const useDeleteProduct = (id: number, confirmDelete: string) => {
    const query = useQuery({
        queryKey: ["DeleteProduct"],
        queryFn: () => deleteProduct(id),
        enabled: confirmDelete === "Delete Product" 
    })

}
