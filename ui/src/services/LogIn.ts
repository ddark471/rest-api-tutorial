import axios from "axios"   
import { login } from "../interfaces"

export const LogIn = async ({email, password}:login) => {
    const url = "https://qahva-control.sytes.net/api/sessions"    
    const body = {
        email: email,
        password: password
    }

    const response = await axios.post(url, body, {
        headers: {
            Authorization: "Bearer accessToken"
        }
    })
        .then(res =>{
                return res
            })
        .catch(err => {
            if(err){
                throw new Error(err.response.data)
            }
        })

    return response;
}