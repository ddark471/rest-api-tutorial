import axios from "axios"

export const deleteCategory = (category_id: number) => {
    const headers = {
        Authorization: "Token 2c1ad184c833eee3f5c9ecf57c52c955bfc445c7"
    }

    const response = axios.delete(`https://web-production-23602.up.railway.app/categories/${category_id}/delete/`, {headers})
        .then(res => {
            return res
        })  .catch(err => {
            throw new Error(err)
            console.error(err)
        })

    return response;
}