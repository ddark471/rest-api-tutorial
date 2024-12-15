import React from 'react'
import User from './User'
import style from "./navbar.module.scss"
import Icons from '../../Icons'

const NavBar = () => {
  return (
    <div className={style.navbar}>
        <div className={style.navbar__logo}>
          <Icons type='fill' name='QahvaLogo'/>
        </div>
        <User/>
    </div>
  )
}

export default NavBar