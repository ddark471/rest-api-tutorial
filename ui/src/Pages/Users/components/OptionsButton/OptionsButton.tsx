import React from 'react'
import style from "./optionsButton.module.scss"
import Icons from '../../../../Icons'

interface OptionsButtonProps{
    setClick: React.Dispatch<React.SetStateAction<boolean>>
    click: boolean
    userIndex: number;
    setCurrentUserIndex: React.Dispatch<React.SetStateAction<number>>
}

const OptionsButton:React.FC<OptionsButtonProps> = ({click, setClick, userIndex, setCurrentUserIndex}) => {
    const handleClick = () => {
        setClick(!click);
        setCurrentUserIndex(userIndex)
    }

    return (
    <div className={style.optionsButton} onClick={handleClick}>
        <div className={style.optionsButton__icon}>
            <Icons type='fill' name='OptionsEllipse'/>
        </div>
        <div className={style.optionsButton__icon}>
            <Icons type='fill' name='OptionsEllipse'/>
        </div>
        <div className={style.optionsButton__icon}>
            <Icons type='fill' name='OptionsEllipse'/>
        </div>
    </div>
  )
}

export default OptionsButton