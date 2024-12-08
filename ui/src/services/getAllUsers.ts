import axios from "axios";

export const getAllUsers = async () => {
    let accessToken = localStorage.getItem("accessToken");
    if(!accessToken) console.error("no access Token");
    let headers = {
        Authorization: `Bearer ${accessToken}`
    }

    const users = await axios.get("https://qahva-control.sytes.net/api/users/all", {
        headers: headers
    })
        .then(res => {
            return res.data
        })  
        .catch(err => {
            throw err
        })
    return users
}