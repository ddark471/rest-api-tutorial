import axios from "axios"

export const LogOut = async () => {
    const deleteSession = await axios.delete("https://qahva-control.sytes.net/api/sessions", {headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "x-refresh": localStorage.getItem("refreshToken")
    }})
        .then(res => {
            return res.data    
        })  .catch(err => {
            console.error(err)
        })

    localStorage.clear()

    return deleteSession
}
