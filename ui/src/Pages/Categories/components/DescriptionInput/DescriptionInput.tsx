import React, {useState, useRef} from 'react'
import style from "./descriptionInput.module.scss"
import TextArea from 'antd/es/input/TextArea'
import type { InputRef } from 'antd'

interface Iprops{
    inputName: string;
    name: string;
    placeholder: string;
    error?: string;
    touched?: boolean;
    value?: string;
    handleChange: (e: React.ChangeEvent<any>) => void;
}

const DescriptionInput:React.FC<Iprops> = ({inputName, name, placeholder, value, error, touched, handleChange}) => {
    const [focus, setFocus] = useState<boolean>(false)
  
    const handleFocus = () => {
        if(touched) setFocus(true)
        else setFocus(false)
    }

    return (
    <label className={error ? style.category__descriptionError : focus ? style.category__descriptionFocus : style.category__description}>
        <span className={style.description__text}>{name}</span>
        <TextArea
            className={style.description__input}
            variant='borderless'
            placeholder={placeholder}
            name={inputName}
            onClick={handleFocus}
            onFocus={handleFocus}
            value={value}
            onChange={handleChange}
            autoComplete={inputName}
        />
    </label>
  )
}

export default DescriptionInput