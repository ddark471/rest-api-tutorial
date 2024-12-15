import { useQuery } from "@tanstack/react-query"
import { getAllMobileUsers } from "../services/getAllMobileUsers"

export const useGetAllMobileUsers = () => {
    const query = useQuery({
        queryKey: ["FetchAllMobileUsers"],
        queryFn: getAllMobileUsers
    })

    return query;
}
