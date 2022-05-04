import {React, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getCountryById } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import ActivityCard from './ActivityCard'
import {Link} from 'react-router-dom'

const CountryDetails = () => {

    const {countryId} = useParams();
    const dispatch = useDispatch();
    const country = useSelector((state) => state.country)
    console.log(countryId)
    useEffect(()=>{
        dispatch(getCountryById(countryId))
    },[dispatch, countryId])



  return (
    <div>
        <div>
        <Link to="/home">
                <button> Back to home </button>
            </Link>
        </div>
        <img src={country.img} alt={country.name}/>
        <h3>{country.name}</h3>
        <p><strong>Capital : </strong>{country.capital}</p>
        <p><strong>Continent : </strong>{country.continent}</p>
        <p><strong>Subregion : </strong>{country.subregion}</p>
        <p><strong>Area : </strong>{country.area}</p>
        <p><strong>Population : </strong>{country.population}</p>
        {country.activities?.map((e)=>
        <ActivityCard
            name={e.name}
            difficult={e.difficult}
            duration={e.duration}
            season={e.season}
            key={e.id}
        /> )}





    </div>
    
  )
}

export default CountryDetails;

