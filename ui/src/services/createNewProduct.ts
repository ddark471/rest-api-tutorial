import axios from "axios"
import { ProductProps } from "../interfaces";

export const createNewProduct = ({productNameRu, productNameUz, descriptionRu, descriptionUz, available_volumes, productPrice, category, image, productSlug, is_active}: ProductProps) => {
    // let productData = new FormData();
    // productData.append("image", image)
    // productData.append("name_ru", productNameRu)
    // productData.append("name_uz", productNameUz)
    // productData.append("description_ru", descriptionRu)
    // productData.append("description_uz", descriptionUz)
    // productData.append("available_volumes", JSON.stringify(available_volumes))
    let body = {
        name_ru: productNameRu,
        name_uz: productNameUz,
        slug: productSlug,
        description_ru: descriptionRu,
        description_uz: descriptionUz,
        price: productPrice,
        category: category,
        image: image,
        available_volumes: available_volumes,
        is_active: is_active
    }

    const response = axios.post("https://web-production-23602.up.railway.app/products/create/", body, {
        headers: {
            Authorization: "Token 2c1ad184c833eee3f5c9ecf57c52c955bfc445c7"
        }
    })
        .then(res => {
            console.log(res)
            return res
        })  .catch(err => {
            console.error(err)
            throw new Error(err)
        })

    return response
}
