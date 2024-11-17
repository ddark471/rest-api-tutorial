import React, {useState} from 'react'
import style from "./users.module.scss"
import { useGetAllUsers } from '../../utils/useGetAllUsers'
import { getDate } from '../../utils/getDate';
import Icons from '../../Icons';
import OptionsButton from './components/OptionsButton';
import UserOptions from './components/UserOptions';
import UserButton from './components/UserButton';

const User = () => {
    const usersQuery = useGetAllUsers();
    const [showUserOptions, setShowUserOptions] = useState<boolean>(false);
    const [currentUserIndex, setCurrentUserIndex] = useState<number>(0)
    if(usersQuery.isLoading) return <h1>Loading...</h1>
    const userOptions = [
        {
            text: "Information",
            iconName: "Info"
        },
        {
            text: "Edit",
            iconName: "Edit"
        },
        {
            text: "Delete User",
            iconName: "DeleteBin"
        }
    ]

  return (
    <div className={style.users}>
        <div className={style.user__createNew}>
            <UserButton/>
        </div>
        <div className={style.users__table}>
        <table className={style.users__main}>
            <tr className={style.main__header}>
                <th className={style.header__item}>ID</th>
                <th className={style.header__item}>Name</th>
                <th className={style.header__item}>Email</th>
                <th className={style.header__item}>Date of Creation</th>
                <th className={style.header__item}>Date of Update</th>
                <th className={style.header__icon}>
                    <Icons type='stroke' name='EditTable'/>
                </th>
            </tr>
            {usersQuery.data.map((item:any, index: number) => (
                <React.Fragment key={index+1}>
                <tr className={style.main__body}>
                    <td className={style.body__item}>
                        {index+1}
                    </td>
                    <td className={style.body__item}>
                        {item?.name}
                    </td>
                    <td className={style.body__item}>
                        {item?.email}
                    </td>
                    <td className={style.body__item}>
                        {getDate(item?.createdAt)}
                    </td>
                    <td className={style.body__item}>
                        {getDate(item?.updatedAt)}
                    </td>
                    <td className={style.body__item}>
                        <OptionsButton click={showUserOptions} setClick={setShowUserOptions} userIndex={index} setCurrentUserIndex={setCurrentUserIndex}/>
                        {showUserOptions && currentUserIndex == index &&  (
                            <div className={style.item__options} style={{top: 60}}>
                                <UserOptions options={userOptions} userId={item?._id}/>
                            </div>)}
                    </td>
                </tr>   
                </React.Fragment>
            ))}    
        </table>
        </div>
    </div>
  )
}

export default User