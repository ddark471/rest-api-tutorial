import React from 'react'
import style from "./sidebar.module.scss"
import SubMenu from './components/SubMenu/SubMenu'

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <a className={style.sidebar__text} href='/'>Home</a>
      <a className={style.sidebar__text} href='/admins'>Admins</a>
      <a className={style.sidebar__text} href='/products'>Products</a>
      <a className={style.sidebar__text} href='/categories'>Categories</a>
      <a className={style.sidebar__text} href='/users'>Users</a>
      {/* <SubMenu
        parentText='Users'
        children={["Admin", "Users"]}
      /> */}
    </div>
  )
}

export default Sidebar