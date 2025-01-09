import React, {useState} from 'react'
import style from "./products.module.scss"
import CreateItemsButton from '../../components/CreateItemsButton'
import { useGetAllProducts } from '../../hooks/useGetAllProducts'
import { getDate } from '../../utils/getDate'
import OptionsButton from '../Users/components/OptionsButton'
import { useGetCategories } from '../../hooks/useGetCategories'
import { useGetCategoryDetails } from '../../hooks/useGetCategoryDetails'
import { Riple } from 'react-loading-indicators'
import { Dropdown, MenuProps, Space, Popconfirm } from 'antd'
import {QuestionCircleOutlined} from "@ant-design/icons"
import Icons from '../../Icons'
import { useDeleteProduct } from '../../hooks/useDeleteProduct'
import Title from 'antd/es/typography/Title'

const Products = () => {
  const products = useGetAllProducts();
  const categories = useGetCategories();
  const [productId,setProductId] = useState<number>(0);
  const [confirmProductDelete, setConfirmProductDelete] = useState<string>("")
  const deleteProduct = useDeleteProduct();
  const handleProductDelete = (id: number) => {
    deleteProduct.mutate(id)
  }

  
  if(products.isLoading || categories.isLoading){ 
    return(
      <div style={{width: "100%", height: "100%", display:'flex', flexDirection: "column",justifyContent: "center", alignItems: "center"}}>
        <Riple color="#b4b7d4" size="large" text="" textColor="" />
      </div>
    )
  }
  if(!products.isLoading && products.error || !categories.isLoading && categories.error) return (<h1>{products.error?.status || categories.error?.status}</h1>)

  return (
    <div className={style.products}>
      <div className={style.products__create}>
        <CreateItemsButton text={"Create New Product"} location="/products/create"/>
        <Title>All products</Title>
      </div>
      <div className={style.products__main} style={{height: 106*4}}>
        {
          products.data.data.map((item:any, index:any) => 
            {
              const items:MenuProps["items"] = [{
                key: "1",
                label: (
                  <Popconfirm
                  title="Delete Product"
                  description="Confirm product deletion"
                  onConfirm={() => handleProductDelete(item?.id)}
                  okText="Yes"
                  cancelText="No"
                  icon={<QuestionCircleOutlined style={{color: "red"}}/>}
                  className={style.dropdown}
              >
                  <span className={style.elem__text}>Delete product</span>
                  <div className={style.elem__icon}>
                      <Icons type='stroke' name='DeleteBin'/>
                  </div>
              </Popconfirm>
                )
            }]
              return (
            <div className={style.main__item}>
              <div className={style.item__image}>
                {item?.image !== null || "" ? (
                  <img src={`http://localhost:8080/api/${item?.image}`} className={style.image}/>
                ) : <span>{item?.name.split(0)}</span>}
              </div>
              <div className={style.item__code}>
              <div className={style.item__body}>
                <span className={style.body__text}>Product: {item?.name_ru}</span>
              </div>
              <div className={style.item__body}>
              {/* {categories?.data?.categories.map((categ:any) => (
                categ.id === item.category ?(<span className={style.body__text}>Categories:  {categ.name_ru} </span>): ""
              ))} */}
              </div>
              <div className={style.item__body}>
                <span className={style.body__text}>Date of creation: {getDate(item?.created_date)}</span>
                <span className={style.body__text}>Date of modification: {getDate(item?.modified_date)}</span>
              </div>
              <div className={style.item__body}>
                <span className={`${style.body__status} ${item?.is_active === true ? style.status__active : style.status__inactive}`}>{item?.is_active === true ? "Active" : "Inactive"}</span>
              </div>
              <div className={style.item__body}>
                <Dropdown
                    menu={{items}}
                    trigger={["click"]}
                    placement='bottomLeft'
                >   
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <OptionsButton/>
                        </Space>
                    </a>
                </Dropdown>
              </div>
            </div>
            </div>
          )})
        }
      </div>
    </div>
  )
}

export default Products