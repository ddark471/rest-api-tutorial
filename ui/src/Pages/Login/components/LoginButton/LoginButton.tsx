import React from 'react'
import style from "./loginButton.module.scss"
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

interface props{
  text?:string;
}

const LoginButton:React.FC<props> = ({text}) => {

  return (
    <Button
      type='primary'
      className={style.loginButton}
      htmlType='submit'
    >
      <span className={style.loginButton__text}>{text}</span>
    </Button>
  )
}

export default LoginButton