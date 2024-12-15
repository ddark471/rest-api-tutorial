import React from 'react'
import style from "./mobileUsers.module.scss"
import { useGetAllMobileUsers } from '../../utils/useGetAllMobileUsers'
import Icons from '../../Icons'
import OptionsButton from '../Users/components/OptionsButton'
import { getDate } from '../../utils/getDate'

const MobileUsers = () => {
  const mobileUsers = useGetAllMobileUsers();
  if(mobileUsers.isLoading) return(<h1>Loading...</h1>)
  return (
    <div className={style.mobile}>
      <div className={style.mobile__main}>
            <table className={style.main__table}>
                <tr className={style.table__header}>
                    <th className={style.header__item}>ID</th>
                    <th className={style.header__item}>UserName</th>
                    <th className={style.header__item}>Phone</th>
                    <th className={style.header__item}>Gender</th>
                    <th className={style.header__item}>Status</th>
                    <th className={style.header__item}>Modified Date</th>
                    <th className={style.header__item}>Birthday</th>
                </tr>
                <tbody className={style.table__body}>
                  {mobileUsers.data?.data?.data.map((item:any, index: number) => (
                        <tr className={style.body__item} key={index+1}>
                            <td className={style.item__element}>{index+1}</td>
                            <td className={style.item__element}>{item?.username}</td>
                            <td className={style.item__element}>{item?.phone}</td>
                            <td className={style.item__element}>{item?.gender}</td>
                            <td className={style.item__element}>{item?.status}</td>
                            <td className={style.item__element}>{getDate(item?.modified_date)}</td>
                            <td className={style.item__element}>{item?.birthday}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MobileUsers