import React, { useContext, useEffect } from 'react'
import style from "./dashboard.module.scss"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import NavBar from '../../components/NavBar'

const Dashboard = () => {
  return (
    <div className={style.wrapper}>
        <NavBar/>
        <div className={style.wrapper__main}>
            <Sidebar/>
            <Outlet/>
        </div>
    </div>
    )
}

export default Dashboard