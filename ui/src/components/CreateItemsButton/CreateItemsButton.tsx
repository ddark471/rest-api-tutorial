import React from 'react'
import style from "./createItemsButton.module.scss"
import { Button } from 'antd'

interface ButtonProps{
  text: string;
  location:string;
}

const CreateItemsButton:React.FC<ButtonProps> = ({text, location}) => {
  return (
    <Button type="primary" className={style.new__user} color='primary' href={location}>
        {text}
    </Button>
  )
}

export default CreateItemsButton