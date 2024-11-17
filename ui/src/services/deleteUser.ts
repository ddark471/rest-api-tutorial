import axios from "axios"

export const deleteUser = async (userId: string) => {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");
    if(!accessToken || !refreshToken){
        throw new Error("No Tokens");
    }

    try{
        const response = await axios.delete(`http://localhost:1337/api/users/${userId}`, {headers: {
            Authorization: `Bearer ${accessToken}`
        }})
        console.log(response)
        return response;
    }   catch(err){
        console.error(err);
    }
}