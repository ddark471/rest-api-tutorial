import axios, { AxiosResponse } from "axios"
import { blob } from "stream/consumers";

export const getUserImage = async (imageUrl?:string) => {
    let accessToken = localStorage.getItem("accessToken");
    if(!accessToken) throw new Error("No Access Token");
    if(imageUrl === undefined) throw new Error("imageUrl must not be undefined") 
    let newImageUrl = imageUrl?.replace("profileImage/","");
    try{
        const profileImage = await axios.get(`http://34.80.155.13:8080/api/users/profileImage/${newImageUrl}`, {headers: {
            Authorization: accessToken
        }, responseType: "blob"})
        console.log(profileImage.data)
        const imageLink = URL.createObjectURL(profileImage.data)
        return imageLink
    }   catch(error){
        console.error(error)
    }
}