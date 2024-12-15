import React, {useState} from 'react'
import style from "./categories.module.scss"
import CreateItemsButton from '../../components/CreateItemsButton'
import { useGetCategories } from '../../utils/useGetCategories'
import { newCategoryProps } from '../../interfaces'
import { getDate } from '../../utils/getDate'
import Icons from '../../Icons'
import OptionsButton from '../Users/components/OptionsButton'
import UserOptions from '../Users/components/UserOptions'

const Categories = () => {
    const categories = useGetCategories();
    const [showUserOptions, setShowUserOptions] = useState<boolean>(false);
    const [currentUserIndex, setCurrentUserIndex] = useState<number>(0)
    const userOptions = [
        {
            text: "Delete Category",
            iconName: "DeleteBin"
        }
    ]
    if(categories.isLoading) return <h1>Loading</h1>
  return (
    <div className={style.categories}>
        <div className={style.categories__create}>
            <CreateItemsButton text='Create Category' location='/categories/create'/>
        </div>
        <div className={style.categories__main}>
            <table className={style.main__table}>
                <tr className={style.table__header}>
                    <th className={style.header__item}>ID</th>
                    <th className={style.header__item}>Name: RU</th>
                    <th className={style.header__item}>Name: UZ</th>
                    <th className={style.header__item}>Description: RU</th>
                    <th className={style.header__item}>Description: UZ</th>
                    <th className={style.header__item}>State</th>
                    <th className={style.header__item}>Slug</th>
                    <th className={style.header__item}>Date of Creation</th>
                    <th className={style.header__item}>Date of Update</th>
                    <th className={style.header__icon}>
                        <Icons type='stroke' name='EditTable'/>
                    </th>
                </tr>
                <tbody className={style.table__body}>
                    {categories.data.categories.map((item:any, index: number) => (
                        <tr className={style.body__item} key={index+1}>
                            <td className={style.item__element}>{index+1}</td>
                            <td className={style.item__element}>{item?.name_ru}</td>
                            <td className={style.item__element}>{item?.name_uz}</td>
                            <td className={style.item__element}>{item?.description_ru}</td>
                            <td className={style.item__element}>{item?.description_uz}</td>
                            <td className={style.item__element}>{item?.is_active === true ? "active" : "inactive"}</td>
                            <td className={style.item__element}>{item?.slug}</td>
                            <td className={style.item__element}>{getDate(item?.created_date)}</td> 
                            <td className={style.item__element}>{getDate(item?.modified_date)}</td>
                            <td className={style.item__element}>
                            <OptionsButton click={showUserOptions} setClick={setShowUserOptions} userIndex={index} setCurrentUserIndex={setCurrentUserIndex}/>
                            {showUserOptions && currentUserIndex == index &&  (
                                <div className={style.item__options} style={{top: 60}}>
                                    <UserOptions options={userOptions} userId={item?._id} categoryId={item?.id} productId={item?.id}/>
                                </div>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Categories