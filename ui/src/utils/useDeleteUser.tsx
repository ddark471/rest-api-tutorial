import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { deleteUser } from '../services/deleteUser'

export const useDeleteUser = (userId:string, optionClick:boolean) => {
  const query = useQuery({
    queryKey: ["DeleteUser"],
    queryFn: () => deleteUser(userId),
    enabled: optionClick === true
  })

  return query;
}
