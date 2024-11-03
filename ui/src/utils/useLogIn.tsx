import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { LogIn } from '../services/LogIn'
import { login } from '../interfaces'

export const useLogIn = () => {
    const {data, mutate, error} = useMutation({
        mutationKey: ["LogIn"],
        mutationFn: ({email, password}: login) => LogIn({email, password})
    })

    return {data, mutate, error}
}