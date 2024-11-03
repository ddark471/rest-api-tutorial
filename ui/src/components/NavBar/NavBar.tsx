import React from 'react'
import User from './User'
import style from "./navbar.module.scss"

const NavBar = () => {
  return (
    <div className={style.navbar}>
        <div className={style.navbar__logo}>Logo</div>
        <User/>
    </div>
  )
}

export default NavBar