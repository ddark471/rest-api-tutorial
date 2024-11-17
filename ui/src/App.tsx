import React from 'react'
import Pages from './Pages'
import style from "./App.module.scss"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
      <div className={style.wrapper}>
        <BrowserRouter>
          <AuthProvider>
            <Pages/>
          </AuthProvider>
        </BrowserRouter>
      </div>
  )
}

export default App