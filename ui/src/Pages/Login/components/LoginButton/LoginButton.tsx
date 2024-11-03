import React from 'react'
import style from "./loginButton.module.scss"
import { Button } from 'antd'

const LoginButton = () => {
  return (
    <Button
      type='primary'
      className={style.loginButton}
      htmlType='submit'
    >
      <span className={style.loginButton__text}>Войти</span>
    </Button>
  )
}

export default LoginButton