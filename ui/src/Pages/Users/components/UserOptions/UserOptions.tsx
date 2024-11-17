import React, {useState} from 'react'
import style from "./userOptions.module.scss"
import { useNavigate } from 'react-router-dom';
import Icons from '../../../../Icons';
import { useDeleteUser } from '../../../../utils/useDeleteUser';
import { createPortal } from 'react-dom';

interface option{
    text: string;
    iconName: string;
}

interface UserOptionsProps{
    options: option[],
    userId: string
}

const UserOptions:React.FC<UserOptionsProps> = ({options, userId}) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const navigate = useNavigate(); 
    const [userInfo, setUserInfo] = useState<string>("");
    const [userEdit, setUserEdit] = useState<string>("");
    const [userDelete, setUserDelete] = useState<string>("");
    const [optionClick, setOptionClick] = useState<boolean>(false);
    const handleClick = (e: React.MouseEvent) => {
        if(e.currentTarget.textContent === "Delete User") setOptionClick(true)
    }
    const deleteUser = useDeleteUser(userId, optionClick)
    if(deleteUser?.status === "success") {
        setShowOptions(false)
    }
    
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