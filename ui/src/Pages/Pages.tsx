import React, {useContext, useEffect, useState} from 'react'
import style from "./pages.module.scss"
import { BrowserRouter, Navigate, redirect, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../context/AuthContext'
import User from './Users'
import CreateUser from './Users/CreateUsers'

const Pages = () => {
    const authContext = useContext(AuthContext);

   if (!authContext) {
       return null; // Prevents rendering if authContext is not provided
   }

   const { token, setToken } = authContext;

  return (
        !token ? (
            <div className={style.login}>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='*' element={<Navigate to={"/login"}/>}/>
                </Routes>
            </div>
        ):(
            <div className={style.wrapper}>
            <NavBar/>
            <div className={style.wrapper__main}>
                <Sidebar/>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path='*' element={<Navigate to={"/home"}/>}/>
                    <Route path='/home/users' element={<User/>}/>
                    <Route path='/home/users/create' element={<CreateUser/>}/>
                </Routes>
        </div>
    </div>)
    )
}

export default Pages