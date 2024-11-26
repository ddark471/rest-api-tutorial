import axios from "axios";
import { NewUser } from "../interfaces";

export const createNewUser = async ({name, email, password, verifyPassword, image}: NewUser) => {
    let accessToken = localStorage.getItem("accessToken");
    if(!accessToken) throw new Error("No access token");
    
    console.log(image)

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

    const response = await axios.post("http://34.80.155.13:8080/api/users", formData, {headers: {
        Authorization: `Bearer ${accessToken}`
    }})
        .then(res => {
            console.log(res);
            return res.data
        })  .catch(err => {
            console.error(err);
        })
    
    return response;
}