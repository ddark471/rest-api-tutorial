import React from 'react'
import Pages from './Pages'
import style from "./App.module.scss"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
        <BrowserRouter>
            <AuthProvider>
              <div className={style.wrapper}>
                <Pages/>
              </div>
            </AuthProvider>
        </BrowserRouter>
  )
}

export default App