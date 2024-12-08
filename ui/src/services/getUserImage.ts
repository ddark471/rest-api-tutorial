import axios, { AxiosResponse } from "axios"
import { blob } from "stream/consumers";

export const getUserImage = async (imageUrl?:string) => {
    let accessToken = localStorage.getItem("accessToken"); 
    let newImageUrl = imageUrl?.replace("profileImage/","");
    try{
        const profileImage = await axios.get(`https://qahva-control.sytes.net/api/users/profileImage/${newImageUrl}`, {headers: {
            Authorization: `Bearer ${accessToken}`
        }, responseType: "blob"})
        console.log(profileImage.data)
        const imageLink = URL.createObjectURL(profileImage.data)
        return imageLink
    }   catch(error){
        console.error(error)
    }
}