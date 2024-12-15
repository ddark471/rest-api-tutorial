import axios from "axios"

interface newCategoryProps{
    categNameRus: string;
    categNameUzb: string;
    categDescRus: string;
    categDescUzb: string;
    categSlug: string;
    categStatus: boolean;
}

export const createNewCategory = async ({categNameRus, categNameUzb, categDescRus, categDescUzb,categSlug, categStatus}: newCategoryProps) => {
    console.log("triggering new category function")
    
    let body = {
        name: {
            ru: categNameRus,
            uz: categNameUzb
        },
        slug: categSlug,
        description: {
            ru: categDescRus,
            uz: categDescUzb
        },
        category_icon: null,
        is_active: categStatus
    }

    const headers = {
        Authorization: "Token 2c1ad184c833eee3f5c9ecf57c52c955bfc445c7"
    }

    const response = await axios.post("https://web-production-23602.up.railway.app/categories/create/", body, {headers})
        .then(res =>{
            console.log(res.data)
            return res.data
        })  .catch(err => {
            throw new Error(err);
            console.error(err)
        })

    return response
}