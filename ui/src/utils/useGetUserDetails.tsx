import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from '../services/getUserDetails'

export const useGetUserDetails = () => {

    const query = useQuery({
        queryKey: ["GetUserDetails"],
        queryFn: () => getUserDetails()
    })

    return query
}
