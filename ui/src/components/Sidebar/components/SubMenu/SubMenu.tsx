import React, {useState} from 'react'
import style from "./subMenu.module.scss"
import Icons from '../../../../Icons';

interface subMenuProps{
    parentText: string;
    children: string[];
}

const SubMenu:React.FC<subMenuProps> = ({parentText, children}) => {
    const [click, setClick] = useState<boolean>(false);

    const handleClick = () => setClick(!click)

  return (
    click ? (
        <div className={style.subMenu}>
            <span className={style.subMenu__text} onClick={handleClick}>
                {parentText}
            </span>
            <div className={style.subMenu__icon} onClick={handleClick}>
                <Icons type='stroke' name='ArrowDown'/>
            </div>
        </div>
    ) : (
        <div className={style.subMenuFocused}>
            <div className={style.subMenuFocused__main}>
                <span className={style.main__text} onClick={handleClick}>
                    {parentText}
                </span>
                <div className={style.main__icon} onClick={handleClick}>
                    <Icons
                        type='stroke'
                        name='ArrowUp'
                    />
                </div>
            </div>
            {
                children.map((item: string) => (
                    <span className={style.text}>{item}</span>
                ))
            }
        </div>
    )
  )
}

export default SubMenu