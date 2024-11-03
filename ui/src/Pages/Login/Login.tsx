import React, { useEffect } from 'react'
import style from "./login.module.scss"
import CustomInput from '../../components/CustomInput'
import LoginButton from './components/LoginButton/LoginButton'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { LogIn } from '../../services/LogIn'
import { login } from '../../interfaces'
import { useLogIn } from '../../utils/useLogIn'

const Login = () => {
  const {data, mutate, error} = useLogIn();

  const handleLogInSubmit = ({email, password}: login) => {
    if(formik.values.email && formik.values.password){
      mutate({"email": formik.values.email, "password": formik.values.password})
    }
  }

  const formValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Неправильная почта")
      .required("Поле обязательное для заполнения"),
    password: Yup.string()
      .required("Поле обязательное для заполнения")
      .min(6,"Password must have 6 chars at least")
      .max(40, "Password must have 40 chars long")
  })

  const formik = useFormik({
    validationSchema: formValidationSchema,
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: handleLogInSubmit
  });
  
  if(data){
    localStorage.setItem("accessToken", data?.accessToken)
    localStorage.setItem("refreshToken", data?.refreshToken)  
  }

  return (
    <form className={style.wrapper} autoComplete='off' onSubmit={formik.handleSubmit}>
      <h1 className={style.wrapper__text}>Вход в систему</h1>
        <div className={style.wrapper__input}>
          <CustomInput
            inputName='email'
            inputType='email'
            placeholder='Введите почту'
            name='Почта'
            handleChange={formik.handleChange}
            value={formik.values.email}
            touched={formik.touched.email}
            error={formik.errors.email}

          />
          <CustomInput
            inputName='password'
            inputType='password'
            placeholder='Введите пароль'
            name='Пароль'
            handleChange={formik.handleChange}
            value={formik.values.password}
            touched={formik.touched.password}
            error={formik.errors.password}
          />
        </div>
        <LoginButton/>
    </form>
  )
}

export default Login