import axios from "axios"   
import { login } from "../interfaces"

export const LogIn = async ({email, password}:login) => {
    const url = "http://34.80.155.13:8080/api/sessions"    
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
                console.log(res)
                return res.data
            })
        .catch(err => {
            console.error(err)
        })

    return response;
}