import React from 'react'
import style from "./user.module.scss"

const User = () => {
  return (
    <div className={style.user}>
      <div className={style.user__text}>
        <span className={style.text__main}>
          Dodajon Xusnitdinov
        </span>
        <span className={style.text__sub}>
          Developer
        </span>
      </div>
      <div className={style.user__image}>
        {/* user image */}
      </div>
    </div>
  )
}

export default User