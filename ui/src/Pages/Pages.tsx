import React, {useContext, useEffect, useState} from 'react'
import style from "./pages.module.scss"
import { BrowserRouter, Navigate, redirect, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import { AuthContext, AuthProvider } from '../context/AuthContext'
import Users from './Users'
import CreateUser from './Users/CreateUsers'
import Dashboard from './Dashboard'
import ProtectedRoutes from './ProtectedRoutes'
import Products from './Products'
import CreateProducts from './Products/CreateProducts'

const Pages = () => {
  return (
      <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/' element={<Dashboard/>}>
                        <Route path='/' element={<Home/>} index/>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/users/create' element={<CreateUser/>}/>
                        <Route path='/products' element={<Products/>}/>
                        <Route path='/products/create' element={<CreateProducts/>} />
                        <Route path="*" element={<h1>Oops, page not found, 404</h1>}/>
                    </Route>
                </Route>    
            </Routes>
        </AuthProvider>
    </BrowserRouter>
    )
}

export default Pages