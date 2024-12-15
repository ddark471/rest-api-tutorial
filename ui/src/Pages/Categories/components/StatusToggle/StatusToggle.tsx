import React, {useState} from 'react'
import style from "./statusToggle.module.scss"

interface Iprops{
    handleToggle: (status: boolean) => {}
}

const StatusToggle: React.FC<Iprops> = ({handleToggle}) => {
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const handleClick = () => {
        setIsToggled(!isToggled)
        handleToggle(isToggled)
        console.log(isToggled)
    }
  return (
    <div onClick={handleClick} className={isToggled ? style.active : style.inactive}>
        {isToggled ? 'Active' : 'Inactive'}
    </div>
  )
}

export default StatusToggle