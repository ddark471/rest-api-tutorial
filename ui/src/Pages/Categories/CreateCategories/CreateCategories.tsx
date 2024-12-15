import React from 'react'
import style from "./createCategories.module.scss"
import CustomInput from '../../../components/CustomInput'
import CategoryInput from '../components/CategoryInput/CategoryInput'
import TextArea from 'antd/es/input/TextArea'
import DescriptionInput from '../components/DescriptionInput'
import * as Yup from "yup"
import { useFormik } from 'formik'
import LoginButton from '../../Login/components/LoginButton/LoginButton'
import StatusToggle from '../components/StatusToggle'
import { useCreateCategory } from '../../../utils/useCreateCategory'
import { newCategoryProps } from '../../../interfaces'

const CreateCategories = () => {
    const categoryValidationSchema = Yup.object().shape({
        categNameRus: Yup.string()
            .required("Название категории обязательно")
            .max(20, "Название категории не может быть больше чем 20 символов"),
        categNameUzb: Yup.string()
            .required("Kategoriya nomi majburiy")
            .max(20, "Kategoriya nomi 20 simvol dan oshiq bola olmaydi"),
        categDescRus: Yup.string()
            .required("Поле Описание категории обязательно"),
        categDescUzb: Yup.string()
            .required("Kategoriya ta'rifi majburiy" ),
        categSlug: Yup.string()
            .required("Field category slug is required"),
        categStatus: Yup.boolean()
            .required("Field category status is required")
    })
    const newCategory = useCreateCategory();
    const handleSubmit = (values: newCategoryProps, actions: any) => {
        if(values){
            newCategory.mutate(values)
        }
            
        actions.setSubmitting(false);
    }

    const formik = useFormik({
        validationSchema: categoryValidationSchema,
        initialValues: {
            categNameRus: "",
            categNameUzb: "",
            categDescUzb: "",
            categDescRus: "",
            categSlug: "",
            categStatus: false

        },
        onSubmit: handleSubmit
    });

  return (
    <form className={style.categories__create} onSubmit={formik.handleSubmit}>
        <h1 className={style.create__text}>Create Category</h1>
        <div className={style.create__main}>
            <div className={style.main__row}>
            <CustomInput
                inputName='categNameRus'
                inputType='text'
                placeholder='Введите название категории'
                name='Название категории'
                handleChange={formik.handleChange}
                value={formik.values.categNameRus}
                error={formik.errors.categNameRus}
                touched={formik.touched.categNameRus}
            />
            <CustomInput
                inputName='categNameUzb'
                inputType='text'
                placeholder='Kategoriya nomini kirgazing'
                name='Kategoriya nomi'
                handleChange={formik.handleChange}
                value={formik.values.categNameUzb}
                error={formik.errors.categNameUzb}
                touched={formik.touched.categNameUzb}  
            />
            </div>
            <div className={style.main__row}>
                <DescriptionInput
                    inputName='categDescRus'
                    name='Описание категории'
                    placeholder='Введите описание категории'
                    handleChange={formik.handleChange}
                    value={formik.values.categDescRus}
                    error={formik.errors.categDescRus}
                    touched={formik.touched.categDescRus}
                />
                <DescriptionInput
                    inputName='categDescUzb'
                    name="Kategoriya ta'rifi"
                    placeholder="Kategoriya ta'rifini kirgazing"
                    handleChange={formik.handleChange}
                    value={formik.values.categDescUzb}
                    error={formik.errors.categDescUzb}
                    touched={formik.touched.categDescUzb}
                />
            </div>
            <div className={style.main__row}>
                <CustomInput
                    inputName='categSlug'
                    inputType='text'
                    placeholder='Введите слаг категории'
                    name='Слаг категории'
                    handleChange={formik.handleChange}
                    value={formik.values.categSlug}
                    error={formik.errors.categSlug}
                    touched={formik.touched.categSlug}
                />
                <div className={style.row__status}>
                    <StatusToggle handleToggle={(status: boolean) => formik.setFieldValue("categStatus", status)}/>
                </div>
            </div>
            <div className={style.button}>
                <LoginButton text='Create Category'/>
            </div>
        </div>
    </form>
  )
}

export default CreateCategories