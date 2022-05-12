import {React, useEffect, useState} from 'react'
import { /*useNavigate,*/ useParams } from 'react-router-dom'
import { getCountryById, clearState, /*deleteActivity*/} from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import ActivityCard from './ActivityCard'
import {Link} from 'react-router-dom'
import styles from './CountryDetails.module.css'
import giphy from '../assets/giphy.gif'

const CountryDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const country = useSelector((state) => state.country)
    //const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      dispatch(getCountryById(id))
      return()=>{
      dispatch(clearState())
      }
    },[dispatch, id])


    if(!!country.img && loading){
      setLoading(!loading)
  }  
  
    // const handleDelete = () =>{
    //   dispatch(deleteActivity(id));
      
    // }
  return (
    <div>
        <div className={styles.nav}>
        <li className={styles.li}><Link to='/home'> Go Home</Link></li>
        </div>
        
        <div className={styles.card} > 
       { !!country.img ? <img src={country.img} width='430px' height='220px' alt={country.name} className={styles.img}/> 
       : <img src={giphy} alt='Loading' className={styles.img} width='430' height='350px'/>  }
        <h3 className={styles.titleone}>{country.name}</h3>
        <p className={styles.letter}><strong>ID : </strong>{country.id}</p>
        <p className={styles.letter}><strong>Capital : </strong>{country.capital}</p>
        <p className={styles.letter}><strong>Continent : </strong>{country.continent}</p>
        <p className={styles.letter}><strong>Subregion : </strong>{country.subregion}</p>
        <p className={styles.letter}><strong>Area : </strong>{country.area} km²</p>
        <p className={styles.letter}><strong>Population : </strong>{country.population}</p>
        

        </div>
  
        {country.activities?.map((e)=>
        
       <ActivityCard
        name={e.name} 
        difficult={e.difficult} 
        duration={e.duration}
        season={e.season}
        key={e.id}
      /> ) }
      
    </div>
       






    
  )
}

export default CountryDetails;

