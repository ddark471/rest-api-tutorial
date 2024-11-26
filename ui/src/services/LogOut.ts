import axios from "axios"

export const LogOut = async () => {
    const deleteSession = await axios.delete("http://34.80.155.13:8080/api/sessions", {headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "x-refresh": localStorage.getItem("refreshToken")
    }})
        .then(res => {
            return res.data    
        })  .catch(err => {
            console.error(err)
        })

    if(deleteSession){
        localStorage.clear();
    }

    return deleteSession
}
