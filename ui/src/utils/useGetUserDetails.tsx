import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from '../services/getUserDetails'

export const useGetUserDetails = (enable: boolean) => {
    const query = useQuery({
        queryKey: ["GetUserDetails"],
        queryFn: () => getUserDetails(),
        staleTime: 300000,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })

    return query
}
