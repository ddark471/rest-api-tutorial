import axios from "axios";

export const getAllProducts = () => {
    const headers = {
        Authorization: "Token 2c1ad184c833eee3f5c9ecf57c52c955bfc445c7"
    }

    const response = axios.get("https://web-production-23602.up.railway.app/products/", {headers})
        .then(res => {
            console.log(res)
            return res.data;
        })  .catch(err => {
            throw new Error(err)
            console.error(err)
        })
    return response
}