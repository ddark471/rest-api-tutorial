import React, {useContext} from 'react'
import { useQuery } from '@tanstack/react-query'
import { deleteUser } from '../services/deleteUser'
import { AuthContext } from '../context/AuthContext'


export const useDeleteUser = (userId:string, optionClick:boolean) => {
  const authContext = useContext(AuthContext);
  const {user} = authContext || {};
  const query = useQuery({
    queryKey: ["DeleteUser"],
    queryFn: () => deleteUser(userId),
    enabled: optionClick === true,
  })
  return query;
}
