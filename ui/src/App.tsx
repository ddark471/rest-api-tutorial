import React from 'react'
import Pages from './Pages'
import style from "./App.module.scss"

const App = () => {
  return (
    <div className={style.wrapper}>
      <Pages/>
    </div>
  )
}

export default App