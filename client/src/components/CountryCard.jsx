import React from 'react'
import {Link} from 'react-router-dom';
import styles from './CountryCard.module.css'



const CountryCard = ({img, name,continent,population,id,subregion}) => {
 
  return (
    
    <Link to= {'/home/' + id}>
    <div className={styles.div} >
        <div className={styles.card}>
               {img && <img src={img} alt= 'Img not found' width='250px' height='125px'className={styles.countryImage}/>}
                <h3>{name }</h3>
                <h3>{continent}</h3>
                <h3>{subregion}</h3>
                <h3>{population}</h3>               
        </div>
    </div>
    </Link>
  )
}

export default CountryCard