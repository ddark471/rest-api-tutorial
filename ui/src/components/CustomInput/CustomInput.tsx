import React, { useState } from 'react'
import style from "./customInput.module.scss"
import { Input } from 'antd'

interface Iprops{
  inputType: string;
  inputName: string;
  placeholder: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
}

const CustomInput:React.FC<Iprops> = ({inputType, inputName, placeholder, name, handleChange, value, error, touched}) => {
  const [focus, setFocus] = useState<boolean>(false);

  const handleFocus = () => {
    if(focus === true) {
      setFocus(false);
    } else{
      setFocus(true)
    }
  }
  
  return (
    <label className={
      error ? style.customInputError : focus ? style.customInputFocus : style.customInput
    }>
      <span className={error ? style.customInputError__prefix : style.customInput__prefix}>
        {name}
      </span>
      <Input
        name={inputName}
        type={inputType}
        variant='borderless'
        className={style.customInput__input}
        autoComplete={inputName}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        onClick={handleFocus}
        onBlur={handleFocus}
      />
      {
        error && (
            <div className={style.customInputError__afterfix}>
              <span className={style.afterfix__text}>
                {error}
              </span>
            </div>
        )
      }
    </label>
  )

}

export default CustomInput