import axios from "axios";

export const getAllUsers = async () => {
    let accessToken = localStorage.getItem("accessTokeen");
    if(!accessToken) console.error("no access Token");
    console.log("getAllUsers executed")
    let headers = {
        Authorization: `Bearer ${accessToken}`
    }

    const users = await axios.get("http://localhost:1337/api/users/all", {
        headers: headers
    })
        .then(res => {
            console.log(res)
            return res.data
        })  
        .catch(err => {
            console.error(err)
            throw err
        })
    console.log(users)
    return users
}