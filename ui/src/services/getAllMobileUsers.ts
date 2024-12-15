import axios from "axios";

export const getAllMobileUsers = () => {
    const response = axios.post("https://web-production-2849.up.railway.app/control/user/pageable")
        .then(res => {
            console.log(res)
            return res;
        })  .catch(err => {
            console.error(err)
            throw new Error(err)
        })

    return response
}