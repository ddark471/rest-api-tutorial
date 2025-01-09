import React, {useEffect, useState} from 'react'
import style from "./createProducts.module.scss"
import CustomInput from '../../../components/CustomInput'
import LoginButton from '../../Login/components/LoginButton/LoginButton'
import * as Yup from "yup"
import { FieldArray, useFormik, getIn, FormikProps } from 'formik'
import { Formik } from 'formik'
import DescriptionInput from '../../Categories/components/DescriptionInput'
import { Button, Input, message, Select, Typography, Upload, UploadProps } from 'antd'
import {UploadOutlined} from "@ant-design/icons"
import { useGetCategories } from '../../../hooks/useGetCategories'
import StatusToggle from '../../Categories/components/StatusToggle'
import { useSaveProductImage } from '../../../hooks/useSaveProductImage'
import { useCreateNewProduct } from '../../../hooks/useCreateNewProduct'
import { useNavigate } from 'react-router-dom'
import Icons from '../../../Icons'
import { Riple } from 'react-loading-indicators'
import { handleCreateProduct } from '../../../utils/utilizedFunctions'
import "../../Users/users.antd.scss"

const CreateProducts = () => {
    // const categories = useGetCategories();  
    const saveImage = useSaveProductImage();
    const newProduct = useCreateNewProduct();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage()
    const {Title} = Typography

    useEffect(() => {
        if(newProduct.isLoading) {
            messageApi.loading({
                content: "Creating product...",
                duration: 0,
                key: 'product-create'
            });
        }
        
        if(newProduct.status === "success"){
            messageApi.destroy('product-create'); // Destroy loading message
            messageApi.success({
                content: "Successfully created product",
                duration: 5,
                icon: <span/>,
                onClose() {
                    navigate("/products")
                },
            });
        }
        
        if(newProduct.status === "error"){
            messageApi.destroy('product-create'); // Destroy loading message
            messageApi.error({
                content: "Couldn't create product",
                duration: 5,
                className: "toastError",
                icon: <span/>        
            });
        }
    }, [newProduct.status, newProduct.isLoading, messageApi, navigate])

    const productValidationSchema = Yup.object().shape({
        productNameRu: Yup.string()
            .required("Название продукта обязательно")
            .max(20, "Название продукта не должно превышть 20 символов"),
        productNameUz: Yup.string()
            .required("Produkt nomi majburiy")
            .max(20, "Produkt nomi 20ta simvoldan oshishi kerak emas"),
        descriptionRu: Yup.string()
            .required("Описание продукта обязательно")
            .max(80, "Описание продукта не должно превышать 80 символов"),
        descriptionUz: Yup.string()
            .required("Produkt ta'rifi majburiy")
            .max(80, "Produkt ta'rifi 80ta simvoldan oshishi mumkin emas"),
        price: Yup.number()
            .required("Product price is reqruired")
            .positive("Price must be positive"),
        slug: Yup.string()
            .required("Slug is required"),
        category: Yup.number()
            .required("Category is required"),
        available_volumes: Yup.array().of(
                Yup.object().shape({
                  volume: Yup.number()
                    .required("Volume is required")
                    .positive("Volume must be positive")
                    .min(0, "minimum value of the volume")
                    .max(10, "maximum value of the volume"),
                  unit: Yup.string()
                    .required("Unit is required")
                    .min(1, "minimum number of characters")
                    .max(5, "maximum number of characters"),
                })
              ).min(1).max(3),
        is_active: Yup.boolean(),
        productImage: Yup.mixed<File>()
            .test("fileSize", "File too large", (value: File | null | undefined) => !value || (value && value.size <= 1024 * 1024 * 5))
            .test("fileType", "Unsupported file format", (value: File | null | undefined) =>
              !value || (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
            )
            .required("Product Image is required")
    })

  return (
    <div className={style.createProducts}>
        {contextHolder}
        <Title>Create Product</Title>
        <Formik
            validationSchema={productValidationSchema}
            initialValues={{
                productNameRu: "",
                productNameUz: "",
                descriptionRu: "",
                descriptionUz: "",
                price: "",
                slug: "",
                category: 0,
                available_volumes: [
                    {
                        volume: 0,
                        unit: ""
                    }
                ],
                is_active: false,
                productImage: null,
            }}
            onSubmit={(values, actions) => handleCreateProduct(values, actions, saveImage, newProduct)}
        >
        {(formikProps) => (
            <form className={style.createProducts__main} onSubmit={formikProps.handleSubmit}>
                <div className={style.main__container}>
                    <div className={style.container__details}>
                        <div className={style.main__row}>
                            <CustomInput
                                inputType='text'
                                inputName='productNameRu'
                                placeholder='Ввведите навзание продукта'
                                name="Название продукта"
                                handleChange={formikProps.handleChange}
                                value={formikProps.values.productNameRu as string}
                                error={formikProps.errors.productNameRu as string}
                                touched={formikProps.touched.productNameRu as boolean}
                            />
                            <CustomInput
                                inputType='text'
                                inputName='productNameUz'
                                placeholder='Produkt nomini kirgazing'
                                name="Produkt Nomi"
                                handleChange={formikProps.handleChange}
                                value={formikProps.values.productNameUz as string}
                                error={formikProps.errors.productNameUz as string}
                                touched={formikProps.touched.productNameUz as boolean}
                            />
                        </div>
                        <div className={style.main__row}>
                            <DescriptionInput
                                inputName='descriptionRu'
                                name='Описание продукта'
                                placeholder='Введите описание продукта'
                                handleChange={formikProps.handleChange}
                                value={formikProps.values.descriptionRu}
                                touched={formikProps.touched.descriptionRu}
                                error={formikProps.errors.descriptionRu}
                            />
                            <DescriptionInput
                                inputName='descriptionUz'
                                name="Produkt ta'rifi"
                                placeholder="Produkt ta'rifini kirgazing"
                                handleChange={formikProps.handleChange}
                                value={formikProps.values.descriptionUz}
                                touched={formikProps.touched.descriptionUz}
                                error={formikProps.errors.descriptionUz}
                            />
                        </div>
                        
                        <div className={style.main__row}>
                            <CustomInput
                                inputType='text'
                                inputName='price'
                                placeholder='Enter product price'
                                name="Product Price"
                                handleChange={formikProps.handleChange}
                                value={formikProps.values.price}
                                error={formikProps.errors.price as string}
                                touched={formikProps.touched.price as boolean}
                            />
                            <div className={style.row__select}>
                                <Select
                                    placeholder="Select category"
                                    // options={categories.data?.categories.map((item:any) => ({
                                    //     value: item?.id,
                                    //     label: item?.name_ru
                                    // }))}
                                    onChange={(value) => formikProps.setFieldValue("category", value)}
                                    onBlur={() => formikProps.setFieldTouched("category", true)}
                                    status={formikProps.errors.category && formikProps.touched.category ? "error": undefined}
                                    value={formikProps.values.category || undefined}
                                />
                                {formikProps.errors.category && formikProps.touched.category && (
                                    <div className={style.error}>
                                        {formikProps.errors.category}
                                    </div>
                                )}
                            </div>
                            <div className={style.row__upload}>
                                <Upload
                                    name="productImage"
                                    beforeUpload={(file) => {
                                        // Preventing automatic upload
                                        return false;
                                    }}
                                    onChange={(info) => {
                                        const file = info.fileList[0]?.originFileObj || null;
                                        formikProps.setFieldValue("productImage", file);
                                    }}
                                    maxCount={1}
                                    accept="image/jpg,image/jpeg,image/png"
                                    showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                                    >
                                    {
                                        formikProps.errors.productImage && formikProps.touched.productImage ? (<Button icon={<UploadOutlined />} danger>Upload Product Image</Button>) : (<Button icon={<UploadOutlined />} >Upload Product Image</Button>)
                                    }
                                </Upload>
                                    {formikProps.errors.productImage && formikProps.touched.productImage && (
                                    <div className={style.upload__afterfix}>
                                            {formikProps.errors.productImage}
                                    </div>)}
                                </div>
                            </div>
                            <div className={style.main__row}>
                                <CustomInput
                                    inputType='text'
                                    inputName='slug'
                                    placeholder='Enter product price'
                                    name="Product Slug"
                                    handleChange={formikProps.handleChange}
                                    value={formikProps.values.slug}
                                    error={formikProps.errors.slug as string}
                                    touched={formikProps.touched.slug as boolean}
                                />
                                <StatusToggle value={formikProps.values.is_active} handleToggle={(status: boolean) => {
                                        formikProps.setFieldValue("is_active", status)
                                    }
                                }/>
                            </div>
                        </div>
                        <FieldArray name='available_volumes'>
                            {({push, remove}) => (
                                <div className={style.main__availableVolumes}>
                                    {formikProps.values.available_volumes.map((_, index) => (
                                        <div key={index} className={style.volumes__wrapper}>
                                            <CustomInput
                                                inputType='text'
                                                inputName={`available_volumes.${index}.volume`}
                                                placeholder='Enter volume'
                                                name="Volume"
                                                handleChange={formikProps.handleChange}
                                                value={formikProps.values.available_volumes[index].volume}
                                                error={getIn(formikProps.errors, `available_volumes.${index}.volume`)}
                                                touched={getIn(formikProps.touched, `available_volumes.${index}.volume`)}
                                            />
                                            <CustomInput
                                                inputType='text'
                                                inputName={`available_volumes.${index}.unit`}
                                                placeholder='Enter unit'
                                                name="Unit"
                                                handleChange={formikProps.handleChange}
                                                value={formikProps.values.available_volumes[index].unit}
                                                error={getIn(formikProps.errors, `available_volumes.${index}.unit`)}
                                                touched={getIn(formikProps.touched, `available_volumes.${index}.unit`)}
                                            />
                                            {index > 0 && (
                                                  <Button typeof="button" type="default" onClick={() => remove(index)}>Remove</Button>
                                            )}
                                        </div>))}
                                    {formikProps.values.available_volumes.length < 3 && (
                                        <Button 
                                            typeof="button"
                                            type="primary" 
                                            className={style.availableVolumes__add}
                                            onClick={() => push({ volume: 0, unit: '' })}
                                        >
                                            Add Volume
                                        </Button>
                                    )}
                                </div>
                            )}
                        </FieldArray>
                    </div>
                <LoginButton text='Создать Продукт' isLoading={newProduct.isLoading}/>
            </form>)}
        </Formik>
    </div>);
}


export default CreateProducts;