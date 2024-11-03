import React, {useEffect, useState} from 'react'
import style from "./pages.module.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import NavBar from '../components/NavBar'

const Pages = () => {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        if(localStorage.getItem("accessToken")){
            setToken(localStorage.getItem("accessToken"))
        }
    }, [localStorage.getItem("accessToken")])

    if(!token) {
       return(
        <div className={style.login}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
       )   
    }

  return (
    <div className={style.wrapper}>
        <NavBar/>
        <div className={style.wrapper__main}>
        {/* 
            Sidebar 
        */} 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
        </div>
    </div>
  )
}

export default Pages