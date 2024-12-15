  import React, { useContext, useEffect, useState } from 'react'
  import style from "./userMain.module.scss"
  import Icons from '../../../../Icons'
  import { LogOut } from '../../../../services/LogOut'
  import { useNavigate } from 'react-router-dom'
  import { AuthContext } from '../../../../context/AuthContext'

  interface UserMainProps{
      setClick: React.Dispatch<React.SetStateAction<boolean>>
      image?: string;
  }

  const UserMain:React.FC<UserMainProps> = ({setClick, image}) => {
    const authContext = useContext(AuthContext);
    if(!authContext) return null;
    const {logout, user} = authContext;
    
    const handleLogout = async () => {
      if(localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")){
        await LogOut();
        logout(); 
      }
    }
    return (
      <div className={style.userMain}>
          <div className={style.userMain__icon} onClick={() => setClick(false)}>
            <Icons type='stroke' name='CloseCircle'/>  
          </div>
          <div className={style.userMain__container}>
              <div className={style.container__header}>
                <div className={style.header__image}>
                  {
                    image ? (
                      <img src={image} className={style.image}/>
                    ) : (
                      <span className={style.image__text}>{user?.name[0]}</span>
                    )
                  }
                </div>
                <span className={style.header__text}>{user?.name}</span>
              </div>
              <hr/>
              <div className={style.container__main}>
                <div className={style.main__item}>
                  <div className={style.item__icon} onClick={handleLogout}>
                    <Icons type='stroke' name='LogOut'/>
                  </div>
                  <span className={style.item__text} onClick={handleLogout}>Log Out</span>
                </div>
              </div>
          </div>
      </div>
    )
  }

  export default UserMain