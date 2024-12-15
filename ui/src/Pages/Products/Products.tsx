import React, {useState} from 'react'
import style from "./products.module.scss"
import CreateItemsButton from '../../components/CreateItemsButton'
import { useGetAllProducts } from '../../utils/useGetAllProducts'
import { getDate } from '../../utils/getDate'
import OptionsButton from '../Users/components/OptionsButton'
import UserOptions from '../Users/components/UserOptions'
import { useGetCategories } from '../../utils/useGetCategories'
import { useGetCategoryDetails } from '../../utils/useGetCategoryDetails'

const Products = () => {
  const products = useGetAllProducts();
  const categories = useGetCategories();
  const [showUserOptions, setShowUserOptions] = useState<boolean>(false);
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0)
  const userOptions = [
      {
          text: "Edit Product",
          iconName: "Edit"
      },
      {
          text: "Delete Product",
          iconName: "DeleteBin"
      }
  ]
  if(products.isLoading && categories.isLoading) return(<h1>Loading...</h1>)
  if(!products.isLoading && products.error || !categories.isLoading && categories.error) return (<h1>{products.error?.status || categories.error?.status}</h1>)
  console.log(categories)
  return (
    <div className={style.products}>
      <div className={style.products__create}>
        <CreateItemsButton text={"Create New Product"} location="/products/create"/>
        <h1 className={style.create__text}>All Products</h1>
      </div>
      <div className={style.products__main}>
        {
          products.data.data.map((item:any, index:any) => (
            <div className={style.main__item}>
              <div className={style.item__image}>
                {item?.image !== null || "" ? (
                  <img src={`https://qahva-control.sytes.net/api/${item?.image}`} className={style.image}/>
                ) : <img className={style.image}/>}
              </div>
              <div className={style.item__body}>
                <span className={style.body__text}>Product: {item?.name_ru}</span>
              </div>
              <div className={style.item__body}>
              {categories?.data?.categories.map((categ:any) => (
                categ.id === item.category ?(<span className={style.body__text}>Kategories:  {categ.name_ru} </span>): ""
              ))}
              </div>
              <div className={style.item__body}>
                <span className={style.body__text}>Date of creation: {getDate(item?.created_date)}</span>
                <span className={style.body__text}>Date of modification: {getDate(item?.modified_date)}</span>
              </div>
              <div className={style.item__body}>
                <span className={`${style.body__status} ${item?.data?.is_active === true? style.status__active : style.status__inactive}`}>{item?.data?.is_active === true? "Active" : "Inactive"}</span>
              </div>
            <div className={style.item__body}>
                <OptionsButton click={showUserOptions} setClick={setShowUserOptions} userIndex={index} setCurrentUserIndex={setCurrentUserIndex}/>
                {showUserOptions && currentUserIndex == index &&  (
                    <div className={style.item__options} style={{top: 60}}>
                        <UserOptions options={userOptions} userId={item?.id} categoryId={item?.id} productId={item?.id}/>
                    </div>)}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products