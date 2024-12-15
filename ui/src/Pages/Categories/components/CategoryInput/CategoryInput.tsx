import React from 'react'
import style from "./categoryInput.module.scss"
import { Input } from 'antd'

const CategoryInput = () => {
  return (
    <label className={style.category__input}>
        <span className={style.input__text}>category input</span>
        <Input
            name='categoryName'
            type='text'
            className={style.input}
            variant='borderless'
        />
    </label>
  )
}

export default CategoryInput