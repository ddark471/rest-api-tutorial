  import React from 'react'
  import style from "./createUsers.module.scss"
  import CustomInput from '../../../components/CustomInput'
  import * as Yup from "yup";
  import { useFormik } from 'formik';
  import LoginButton from '../../Login/components/LoginButton/LoginButton';
  import { useCreateNewUser } from '../../../hooks/useCreateNewUser';

  const CreateUser = () => {
    const imageFormData = new FormData();
    const newUserValidationSchema = Yup.object().shape({
      name: Yup.string()
        .required("Name is required")
        .max(20, "Name must not be longer than 20 chars"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      image: Yup.mixed<File>()
      .test("fileSize", "File too large", (value: File | null | undefined) => !value || (value && value.size <= 1024 * 1024 * 5))
      .test("fileType", "Unsupported file format", (value: File | null | undefined) =>
        !value || (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
      ), 
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must not be shorter than 8 chars")
        .max(20, "Password must not be longer than 20 chars")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, including an uppercase letter, lowercase letter, number, and special character."),
      verifyPassword: Yup.string()
        .required("Verify Password is required")
        .oneOf([Yup.ref('password')], "Passwords must match")
    })

    const createNewUser = useCreateNewUser();
    
    const handleSubmit = (values: any, actions: any) => {
      if(values?.name && values?.email && values?.password && values?.verifyPassword && values?.image){
        imageFormData.append("image", values?.image)
        console.log(imageFormData)
        createNewUser.mutate({name: values.name, email: values.email, password: values.password, verifyPassword:values.verifyPassword, image: values.image})
      }

      actions?.resetForm({
        name: "",
        email: "",
        password: "",
        verifyPassword: "", 
        image: null
      })
      actions.setSubmitting(false)
    }

    const formik = useFormik({
      validationSchema: newUserValidationSchema,
      initialValues: {
        name: "",
        email: "",
        password: "",
        verifyPassword: "",
        image: ""
      },
      onSubmit: handleSubmit
    })

    if(createNewUser.data){
      console.log(createNewUser.data)
    }

    return (
      <form className={style.createUser} onSubmit={formik.handleSubmit}>
        <div className={style.createUser__main}>
          <CustomInput
            inputType='text'
            inputName='name'
            placeholder='Enter Name'
            name="Name"
            handleChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
            touched={formik.touched.name}
          />
          <CustomInput
            inputType='text'
            inputName='email'
            placeholder='Enter Email'
            name="Email"
            handleChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <CustomInput
            inputType='text'
            inputName='password'
            placeholder='Enter Password'
            name="Password"
            handleChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <CustomInput
            inputType='text'
            inputName="verifyPassword"
            placeholder='Verify Password'
            name="Verify Password"
            handleChange={formik.handleChange}
            value={formik.values.verifyPassword}
            error={formik.errors.verifyPassword}
            touched={formik.touched.verifyPassword}
          />
          <CustomInput
            inputType='file'
            inputName='image'
            placeholder='Upload Image'
            accept="image/*"
            name='Upload Image'
            handleChange={(event) => {
              const file = event.currentTarget.files?.[0] || null;
              formik.setFieldValue("image", file)
            }}
            error={formik.errors.image}
            touched={formik.touched.image}
          />
          <LoginButton/>
        </div>
      </form>
    )
  }

  export default CreateUser