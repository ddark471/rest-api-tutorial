import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/getAllUsers'

export const useGetAllUsers = () => {
    const query = useQuery({
        queryKey: ["AllUsers"],
        queryFn: () => getAllUsers()
    })

    return query    
}
