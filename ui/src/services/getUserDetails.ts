import axios, { AxiosResponse } from "axios";
import { userDetails } from "../interfaces";

export const getUserDetails = async () => {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken")
    if(!accessToken || !refreshToken){
        console.log("tokens has been blocked")
        throw Error("No Tokens")
    }

    let headers = {
        Authorization: `Bearer ${accessToken}`,
        "x-refresh": refreshToken
    }
    const response = await axios.get("https://qahva-control.sytes.net/api/users/details", {
        headers: headers
    })
        .then(res => {
            console.log(res)
            return res.data
        })  .catch(err => {
            throw err
        })
    const userDetails: userDetails = response;
    return userDetails;
}