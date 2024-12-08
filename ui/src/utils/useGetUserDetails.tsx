import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from '../services/getUserDetails'

export const useGetUserDetails = (enable: boolean) => {
    console.log(enable)
    const query = useQuery({
        queryKey: ["GetUserDetails"],
        queryFn: () => getUserDetails()
    })

    console.log(query.data)

    return query
}
