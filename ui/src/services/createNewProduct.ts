import axios from "axios"

interface ProductProps{
    title: string;
    description: string;
    price: number;
    image: File | null;
}

export const createNewProduct = ({title, description, price, image}: ProductProps) => {
    /*
        logic of current product creation

        1) submit image data
        2) after receiving image path, replace it with the original image before submitting the product
        3) submit product form data
    */

    let imageData = new FormData();
    if(image) imageData.append("image", image)
}
