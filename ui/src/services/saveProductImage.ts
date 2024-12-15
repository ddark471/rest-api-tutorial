import axios from "axios";

export const saveProductImage = (productImage: File) => {
    console.log("this is saveProductImage.ts", productImage)
    const imageData = new FormData();
    if(productImage) imageData.append("image", productImage)
        console.log("this is saveProductImage.ts imageData",imageData)
    const response = axios.post("https://qahva-control.sytes.net/api/productImage/", imageData)
        .then(res => {
            console.log(res)
            return res;
        })  .catch(err => {
            console.error(err)
            throw new Error(err)
        })
    
    return response
}