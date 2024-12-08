import axios from "axios";
import { NewUser } from "../interfaces";

export const createNewUser = async ({name, email, password, verifyPassword, image}: NewUser) => {
    let accessToken = localStorage.getItem("accessToken");
    if(!accessToken) throw new Error("No access token");

    let formData = new FormData();
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("passwordConfirmation", verifyPassword)
    if(image){
        formData.append("image", image)
    }

    let body = {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: verifyPassword,
        image: image    
    }

    const response = await axios.post("https://qahva-control.sytes.net/api/users", formData, {headers: {
        Authorization: `Bearer ${accessToken}`
    }})
        .then(res => {
            return res.data
        })  .catch(err => {
            throw err
        })
    
    return response;
}