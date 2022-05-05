import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.page}>
            <Link to='/'>
        <button className={styles.button}>
            Go Home 
        </button>
            </Link>
        <h1 className={styles.title}>404 Not Found</h1>
        <h3 className={styles.title}>Houston, Nothing to do here 🚀</h3>
        </div>
  )
}

export default NotFound