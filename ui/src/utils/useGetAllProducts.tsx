import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../services/getAllProducts"
import { AxiosError } from "axios"

export const useGetAllProducts = () => {
    const query = useQuery<any, AxiosError>({
        queryKey: ["AllProducts"],
        queryFn: () => getAllProducts()
    })

    return query
}
