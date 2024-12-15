import { useQuery } from "@tanstack/react-query"
import { deleteCategory } from "../services/deleteCategory"

export const useDeleteCategory = (category_id:number, categoryDelete: string) => {
    const query = useQuery({
        queryKey: ["DeleteCategory"],
        queryFn: () => deleteCategory(category_id),
        enabled: categoryDelete === "Delete Category"
    })

}
