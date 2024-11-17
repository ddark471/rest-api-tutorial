import React from 'react'
import style from "./sidebar.module.scss"
import SubMenu from './components/SubMenu/SubMenu'

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <a className={style.sidebar__text} href='/home'>Home</a>
      <a className={style.sidebar__text} href='/home/users'>Users</a>
      <a className={style.sidebar__text} href='/home/products'>Products</a>
      {/* <SubMenu
        parentText='Users'
        children={["Admin", "Users"]}
      /> */}
    </div>
  )
}

export default Sidebar