import React, {useState, useRef, useContext, useEffect} from 'react'
import style from "./user.module.scss"
import UserMain from './UserMain';
import { AuthContext } from '../../../context/AuthContext';
import { getUserImage } from '../../../services/getUserImage';
import { profileEnd } from 'console';

const User = () => {
  const authContext = useContext(AuthContext);
  const {user} = authContext || {};
  const [click, setClick] = useState<boolean>(false);
  const handleClick = () => setClick(!click)
  const [profileImage, setProfileImage] = useState<string>();
  useEffect(() => {
    const provideUserImage = async () => {
      if(user?.image){
       try{
        const imageLink = await getUserImage(user?.image);
        setProfileImage(imageLink)
       } catch(err){
        console.error(err)
       }
      }
    }
    provideUserImage();
  }, [user])

  console.log(user)

  return (
    click ? (
      <UserMain setClick={setClick} image={profileImage}/>
    ):(
      <div className={style.user}>
      <div className={style.user__text}>
        <span className={style.text__main}  onClick={handleClick}>
          {user?.name}
        </span>
        <span className={style.text__sub}  onClick={handleClick}>
          {user?.email}
        </span>
      </div>
      <div className={style.userImage__container}  onClick={handleClick}>
        <div className={style.container__image}>
          {
            profileImage ? (
              <img src={profileImage} className={style.image}/>
            ) : (
              <span className={style.image__text}>{user?.name[0]}</span>
            )
          }
        </div>
      </div>
    </div>
    )
  )
}

export default User