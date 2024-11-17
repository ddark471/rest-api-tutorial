import axios, { AxiosResponse } from "axios";
import { User } from "../interfaces";

export const getUserDetails = async () => {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken")

    if(!accessToken || !refreshToken){
        console.error("no tokens")
        return undefined;    
    }

    let headers = {
        Authorization: `Bearer ${accessToken}`,
        "x-refresh":refreshToken
    }
    const response = await axios.get("http://localhost:1337/api/users/details", {
        headers: headers
    })
        .then(res => {
            console.log(res.data)
            return res.data
        })  .catch(err => {
            console.error(err)
        })

    const userDetails: User = response.decoded ? response.decoded : response;


    return userDetails;
}
