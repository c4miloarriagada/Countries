import {React, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getCountryById } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import ActivityCard from './ActivityCard'
import {Link} from 'react-router-dom'
import styles from './CountryDetails.module.css'

const CountryDetails = () => {

    const {countryId} = useParams();
    const dispatch = useDispatch();
    const country = useSelector((state) => state.country)
    console.log(countryId)
    useEffect(()=>{
        dispatch(getCountryById(countryId))
    },[dispatch, countryId])



  return (
    <div className={styles.page}>
        <div className={styles.nav}>
        <li className={styles.li}><Link to='/home'> Go Home</Link></li>
        </div>
        
        <div className={styles.card} > 
        <img src={country.img} width='430px' height='220px' alt={country.name} className={styles.img}/>
        <h3 className={styles.titleone}>{country.name}</h3>
        <p className={styles.letter}><strong>Capital : </strong>{country.capital}</p>
        <p className={styles.letter}><strong>Continent : </strong>{country.continent}</p>
        <p className={styles.letter}><strong>Subregion : </strong>{country.subregion}</p>
        <p className={styles.letter}><strong>Area : </strong>{country.area} km²</p>
        <p className={styles.letter}><strong>Population : </strong>{country.population}</p>
        <div>
        {country.activities?.map((e)=>
        <ActivityCard
            name={e.name} 
            difficult={e.difficult} 
            duration={e.duration}
            season={e.season}
            key={e.id}
        /> )}

        </div>
        </div>
       






    </div>
    
  )
}

export default CountryDetails;

