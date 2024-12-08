import React from 'react'
import style from "./createProducts.module.scss"
import CustomInput from '../../../components/CustomInput'
import LoginButton from '../../Login/components/LoginButton/LoginButton'
import * as Yup from "yup"
import { useFormik } from 'formik'

const CreateProducts = () => {
    const productValidationSchema = Yup.object().shape({
        title: Yup.string()
            .required("Product title is required"),
        description: Yup.string()
            .required("Product description is required")
            .min(20, "Minimum 20 number of characters for the description")
            .max(80, "Maximum 80 number of characters for the description"),
        price: Yup.number(  )
            .required("Product price is reqruired"),
        image: Yup.mixed<File>()
            .test("fileSize", "File too large", (value: File | null | undefined) => !value || (value && value.size <= 1024 * 1024 * 5))
            .test("fileType", "Unsupported file format", (value: File | null | undefined) =>
              !value || (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
            )
    })

    const handleSubmit = (values: any, actions: any) => {
        if(values.title && values.description)
        actions.setSubmitting(false)
      }
  
    const formik = useFormik({
        validationSchema: productValidationSchema,
        initialValues: {
            title: "",
            description: "",
            price: "",
            image: null
        },
        onSubmit: (values:any) => console.log(values.title)
    })

    console.log(formik.values)
  return (
    <div className={style.createProducts}>
        <form className={style.createProducts__main} onSubmit={formik.handleSubmit}>
            <CustomInput
                inputType='text'
                inputName='title'
                placeholder='Enter product title'
                name="Product Title"
                handleChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title as string}
                touched={formik.touched.title as boolean}
            />
            <CustomInput
                inputType='text'
                inputName='description'
                placeholder='Enter product description'
                name="Product Description"
                handleChange={formik.handleChange}
                value={formik.values.description}
                error={formik.errors.description as string}
                touched={formik.touched.description as boolean}
            />
            <CustomInput
                inputType='text'
                inputName='price'
                placeholder='Enter product price'
                name="Product Price"
                handleChange={formik.handleChange}
                value={formik.values.price}
                error={formik.errors.price as string}
                touched={formik.touched.price as boolean}
            />
            <CustomInput
                inputType='file'
                inputName='image'
                placeholder='Upload Product Image'
                name="Product Image"
                accept='image/*'
                handleChange={(event) => {
                    const file = event.currentTarget.files?.[0] || null;
                    formik.setFieldValue("image", file)
                  }}
                error={formik.errors.image as string}
                touched={formik.touched.image as boolean}
            />
            <LoginButton text='Создать Продукт' />
        </form>
    </div>);
}

export default CreateProducts;