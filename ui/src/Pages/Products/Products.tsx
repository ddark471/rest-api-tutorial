import React from 'react'
import style from "./products.module.scss"
import CreateItemsButton from '../../components/CreateItemsButton'

const Products = () => {
  return (
    <div className={style.products}>
      <div className={style.products__create}>
        <CreateItemsButton text={"Create New Product"} location="/products/create"/>
      </div>

      <div className={style.products__main}>
        
      </div>
    </div>
  )
}

export default Products