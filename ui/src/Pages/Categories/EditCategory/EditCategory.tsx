import React, { useEffect, useMemo } from 'react'
import style from "./editCategory.module.scss"
import * as Yup from "yup"
import { useFormik } from 'formik'
import LoginButton from '../../Login/components/LoginButton/LoginButton'
import CustomInput from '../../../components/CustomInput'
import DescriptionInput from '../components/DescriptionInput'
import StatusToggle from '../components/StatusToggle'
import { newCategoryProps } from '../../../interfaces'
import { useCreateCategory } from '../../../utils/useCreateCategory'
import { useParams } from 'react-router-dom'
import { useGetCategoryDetails } from '../../../utils/useGetCategoryDetails'

const EditCategory = () => {
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
    actions.resetForm()
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

  const {category_id} = useParams();
  const {data, isLoading, error} = useGetCategoryDetails(category_id ? category_id : "");
  useMemo(() => {
    formik.setFieldValue("categNameRus", data?.data?.category?.name_ru)
    formik.setFieldValue("categNameUzb", data?.data?.category?.name_uz)
    formik.setFieldValue("categDescRus", data?.data?.category?.description_ru)
    formik.setFieldValue("categDescUzb", data?.data?.category?.description_uz)
    formik.setFieldValue("categSlug", data?.data?.category?.slug)
    formik.setFieldValue("categStatus", data?.data?.category?.categStatus)
  }, [data])
  if(isLoading) return (<h1>Loading...</h1>)
  /*
  logic of the edit category

1) get id
2) get category details
3) put them to the belonging inputs
4) if any changes were made, write them to the formik values
5) post them to the server
6) show toast either error(red) and success(lightgreen or green)
*/

return (
<form className={style.categories__create} onSubmit={formik.handleSubmit}>
    <h1 className={style.create__text}>Edit Category</h1>
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

export default EditCategory