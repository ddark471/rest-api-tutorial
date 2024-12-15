import React, {useState} from 'react'
import style from "./userOptions.module.scss"
import { useNavigate } from 'react-router-dom';
import Icons from '../../../../Icons';
import { useDeleteUser } from '../../../../utils/useDeleteUser';
import { createPortal } from 'react-dom';
import { useDeleteCategory } from '../../../../utils/useDeleteCategory';
import { useDeleteProduct } from '../../../../utils/useDeleteProduct';

interface option{
    text: string;
    iconName: string;
}

interface UserOptionsProps{
    options: option[],
    userId: string,
    categoryId: number
    productId: number
}

const UserOptions:React.FC<UserOptionsProps> = ({options, userId, categoryId, productId}) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const navigate = useNavigate(); 
    const [userInfo, setUserInfo] = useState<string>("");
    const [userEdit, setUserEdit] = useState<string>("");
    const [categoryDelete, setCategoryDelete] = useState<string>("");
    const [categoryEdit, setCategoryEdit] = useState<boolean>(false);
    const [optionClick, setOptionClick] = useState<boolean>(false);
    const [productDelete, setProductDelete] = useState<string>("")
    const handleClick = (e: React.MouseEvent) => {
        if(e.currentTarget.textContent === "Delete Admin") setOptionClick(true)
        if(e.currentTarget.textContent === "Delete Category") setCategoryDelete(e.currentTarget.textContent)   
        if(e.currentTarget.textContent === "Delete Product") setProductDelete(e.currentTarget.textContent)     
        if(e.currentTarget.textContent === "Edit Category") navigate(`/categories/edit/${categoryId}`)
    }

    const deleteUser = useDeleteUser(userId, optionClick)
    const deleteCategory = useDeleteCategory(categoryId, categoryDelete)
    const deleteProduct = useDeleteProduct(productId, productDelete)
    React.useEffect(() => {
        if (deleteUser?.status === "success") {
            setShowOptions(false);
        }
        
    }, [deleteUser?.status]);
    
    return (
    <div className={style.userOptions}>
        {options.map((item:option, index) => (
            <div className={style.userOptions__item} key={index} onClick={(e) => handleClick(e)}>
                <span className={style.item__text}>
                    {item.text}
                </span>
                <div className={style.item__icon}>
                    <Icons type="stroke" name={item.iconName}/>
                </div>
            </div>
        ))}
    </div>
  )
}

export default UserOptions