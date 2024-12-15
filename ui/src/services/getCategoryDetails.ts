import axios from "axios"

export const getCategoryDetails = (category_id: string) => {
    const headers = {
        Authorization: "Token 2c1ad184c833eee3f5c9ecf57c52c955bfc445c7"
    }

    try{
        const response = axios.get(`https://web-production-23602.up.railway.app/categories/${category_id}/`, {headers})
        return response;
    }   catch(err){
        console.error(err)
    }
}