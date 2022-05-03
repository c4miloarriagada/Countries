import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'
import style from './Button.module.css'


const LandingPage = () => {
  return (
    <div className={styles.page}>
        <h1 className={styles.h1}>    Welcome to Country App! 🌎  </h1>
        <Link to = '/home/'>
            <button className={style.button}> Enter Site </button>
        </Link>
    </div>
  )
}

export default LandingPage