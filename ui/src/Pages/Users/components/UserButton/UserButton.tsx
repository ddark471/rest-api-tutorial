import React from 'react'
import style from "./userButton.module.scss"
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const UserButton = () => {
  return (
    <Button type="primary" className={style.new__user} color='primary' href='/home/users/create'>
        Create New User
    </Button>
  )
}

export default UserButton