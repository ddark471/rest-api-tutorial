import React, {useState, useEffect} from 'react'
import style from "./createProducts.module.scss"
import CustomInput from '../../../components/CustomInput'
import LoginButton from '../../Login/components/LoginButton/LoginButton'
import * as Yup from "yup"
import { useFormik } from 'formik'
import DescriptionInput from '../../Categories/components/DescriptionInput'
import { Input } from 'antd'
import { useGetCategories } from '../../../utils/useGetCategories'
import StatusToggle from '../../Categories/components/StatusToggle'
import { useSaveProductImage } from '../../../utils/useSaveProductImage'
import { ProductFormValues } from '../../../interfaces'
import { useCreateNewProduct } from '../../../utils/useCreateNewProduct'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import Icons from '../../../Icons'

const CreateProducts = () => {
    const categories = useGetCategories();
    const [showCategories, setShowCategories] = useState<boolean>(false)
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
            .required("Product price is reqruired"),
        slug: Yup.string()
            .required("Slug is required"),
        category: Yup.number()
            .required("Category is required"),
        available_volumes: Yup.array().of(
                Yup.object().shape({
                  volume: Yup.number(),
                  unit: Yup.string()
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
    const saveImage = useSaveProductImage();
    const newProduct = useCreateNewProduct();
    const [showToast, setShowToast] = useState<boolean>(false)
  const [toastClass, setToastClass] = useState<"toastShow" | "toastHide" | "">("")
    const navigate = useNavigate();
    
    const handleSubmit = (values: any, actions: any) => {
        console.log(values);
        
        if (values.slug && values.productImage) {
            // Extract the original file and its type
            const originalFile = values.productImage;
            const fileExtension = originalFile.name.split('.').pop(); // Get file extension (e.g., jpg, png)
    
            // Create a new file with the renamed name
            const renamedFile = new File(
                [originalFile], // File content
                `${values.slug}.${fileExtension}`, // New name
                { type: originalFile.type } // Preserve the MIME type
            );
    
            console.log("Renamed File:", renamedFile);
            saveImage.mutate(renamedFile, {
                onSuccess: (response) => {
                    // Assuming the uploaded image URL is in `response.data`
                    const imageUrl = response.data; // Adjust based on actual response structure
                    console.log(imageUrl)
                    // Call createNewProduct after the image upload is successful
                    newProduct.mutate(
                        {
                            productNameRu: values?.productNameRu,
                            productNameUz: values?.productNameUz,
                            descriptionRu: values?.descriptionRu,
                            descriptionUz: values?.descriptionUz,
                            productPrice: values?.price,
                            productSlug: values?.slug,
                            category: values?.category,
                            available_volumes: values?.available_volumes,
                            image: imageUrl,
                            is_active: values?.is_active,
                        },
                        {
                            onSuccess: () => {
                                // Reset the form on success
                                actions.setSubmitting(false);
                                actions.resetForm();
                            },
                            onError: (error) => {
                                console.error("Error creating product:", error);
                            },
                        }
                    );
                },
                onError: (error) => {
                    console.error("Error uploading image:", error);
                },
            });
        }
    };

    const formik = useFormik<ProductFormValues>({
        validationSchema: productValidationSchema,
        initialValues: {
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
        },  
        onSubmit: handleSubmit
    })
    
    const handleCategoryChooseClick = (id: number) => {
        formik.setFieldValue("category", id)
        setShowCategories(false)
    }

    const isVolumeErrorObject = (
        error: any
    ): error is { volume: string; unit: string } => {
        return (
            error &&
            typeof error === "object" &&
            "volume" in error &&
            "unit" in error
        );
    };
    if(!newProduct.isLoading) console.log(newProduct.data)
    if(formik.errors) console.error(formik.errors)
        useEffect(() => {
            setShowToast(true);
            setToastClass("toastShow")
            setTimeout(() => setToastClass("toastHide"), 5000)
            setTimeout(() => {
              setShowToast(false)
              setToastClass("")
            }, 6000)
            if (newProduct.isSuccess) {
                setTimeout(() => {
                  navigate("/products"); // Replace with your desired route
                }, 6000); // Navigate after 6 seconds (after the toast disappears)
              }
        }, [newProduct.isError, newProduct.isSuccess]) 
  return (
    <div className={style.createProducts}>
        {newProduct.isError && showToast && (
        createPortal(
          <div className={`${style.toast} ${style[toastClass]}`}>
            <div className={style.toast__icon}>
              <Icons type='fill' name='InfoCircle'/>
            </div>
            <span className={style.toast__text}>
              {typeof newProduct.error === "string" ? newProduct.error : "Coulnd't create product"}
            </span>
          </div>, 
        document.getElementById("portal") as HTMLElement
        )
      )}
      {newProduct.isSuccess && showToast && (
        createPortal(
          <div className={`${style.toastSuccess} ${style[toastClass]}`}>
            <div className={style.toast__icon}>
              <Icons type='fill' name='InfoCircle'/>
            </div>
            <span className={style.toast__text}>
              Successfully created product
            </span>
          </div>, 
        document.getElementById("portal") as HTMLElement
        )
      ) }
        <h1>Create Product</h1>
        <form className={style.createProducts__main} onSubmit={formik.handleSubmit}>
            <div className={style.main__row}>
                <CustomInput
                    inputType='text'
                    inputName='productNameRu'
                    placeholder='Ввведите навзание продукта'
                    name="Название продукта"
                    handleChange={formik.handleChange}
                    value={formik.values.productNameRu as string}
                    error={formik.errors.productNameRu as string}
                    touched={formik.touched.productNameRu as boolean}
                />
                <CustomInput
                    inputType='text'
                    inputName='productNameUz'
                    placeholder='Produkt nomini kirgazing'
                    name="Produkt Nomi"
                    handleChange={formik.handleChange}
                    value={formik.values.productNameUz as string}
                    error={formik.errors.productNameUz as string}
                    touched={formik.touched.productNameUz as boolean}
                />
            </div>
            <div className={style.main__row}>
                <DescriptionInput
                    inputName='descriptionRu'
                    name='Описаие продукта'
                    placeholder='Введите описание продукта'
                    handleChange={formik.handleChange}
                    value={formik.values.descriptionRu as string}
                    touched={formik.touched.descriptionRu as boolean}
                    error={formik.errors.descriptionRu as string}
                />
                <DescriptionInput
                    inputName='descriptionUz'
                    name="Produkt ta'rifi"
                    placeholder="Produkt ta'rifini kirgazing"
                    handleChange={formik.handleChange}
                    value={formik.values.descriptionUz as string}
                    touched={formik.touched.descriptionUz as boolean}
                    error={formik.errors.descriptionUz as string}
                />
            </div>
            {formik.values.available_volumes.map((item: { volume: number; unit: string }, index: number) => {
    const currentError = formik.errors.available_volumes
    ? formik.errors.available_volumes[index]
    : null;

const volumeError = currentError && isVolumeErrorObject(currentError)
    ? currentError.volume
    : "";

const unitError = currentError && isVolumeErrorObject(currentError)
    ? currentError.unit
    : "";

    return (
        <div className={style.main__row} key={index}>
            <CustomInput
                inputType="text"
                inputName={`available_volumes[${index}].volume`}
                placeholder="Enter measuring volume"
                name="Volume"
                handleChange={formik.handleChange}
                value={item.volume}
                error={volumeError}
                touched={
                    Array.isArray(formik.touched.available_volumes)
                        ? formik.touched.available_volumes[index]?.volume
                        : false
                }
            />
            <CustomInput
                inputType="text"
                inputName={`available_volumes[${index}].unit`}
                placeholder="Enter measuring unit"
                name="Unit"
                handleChange={formik.handleChange}
                value={item.unit}
                error={unitError}
                touched={
                    Array.isArray(formik.touched.available_volumes)
                        ? formik.touched.available_volumes[index]?.unit
                        : false
                }
            />
        </div>
    );
})}
            <div className={style.main__row}>
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
                <label className={style.category__input}>
                    <span className={style.input__prefix}>Category</span>
                    <Input
                        name='category'
                        type='text'
                        value={formik.values.category as number}
                        onChange={formik.handleChange}
                        onClick={() => setShowCategories(!showCategories)}
                        variant='borderless'
                        className={style.input}
                        placeholder='Select category'
                    />
                    {
                        showCategories && (
                            <div className={style.input__suggestions}>
                                {categories.data?.categories.map((item:any) => (
                                    <div className={style.suggestions__item} onClick={() => handleCategoryChooseClick(item?.id)}>
                                        <span className={style.item__text}>{item?.name_ru}</span>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </label>
                
                <CustomInput
                    inputType='file'
                    inputName='productImage'
                    placeholder='Upload Product Image'
                    name="Product Image"
                    accept='image/*'
                    handleChange={(event) => {
                        const file = event.currentTarget.files?.[0] || null;
                        formik.setFieldValue("productImage", file)
                    }}
                    error={formik.errors.productImage as string}
                    touched={formik.touched.productImage as boolean}
                />
            </div>
            <div className={style.main__row}>
                <CustomInput
                    inputType='text'
                    inputName='slug'
                    placeholder='Enter product price'
                    name="Product Slug"
                    handleChange={formik.handleChange}
                    value={formik.values.slug}
                    error={formik.errors.slug as string}
                    touched={formik.touched.slug as boolean}
                />
                <StatusToggle handleToggle={(status: boolean) => formik.setFieldValue("is_active", status)}/>
            </div>
            <LoginButton text='Создать Продукт' />
        </form>
    </div>);
}

export default CreateProducts;