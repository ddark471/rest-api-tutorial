import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../services/getCategories"
import { AxiosError } from "axios"

export const useGetCategories = () => {
    const query = useQuery<any, AxiosError>({
        queryKey: ["CategoriesList"],
        queryFn: () => getCategories()
    })

    return query
}
