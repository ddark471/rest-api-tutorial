import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { NewUser } from '../interfaces'
import { createNewUser } from '../services/createNewUser'

export const useCreateNewUser = () => {
  const query = useMutation({
    mutationKey: ["createUser"],
    mutationFn: ({name, email, password, verifyPassword, image}: NewUser) => createNewUser({name, email, password, verifyPassword, image})
  })

  return query;
}
