import React, { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, filterByContinents, filterActivity, orderByName, getActivities, getCountriesByPopulation } from "../actions";
import { Link } from 'react-router-dom'
import CountryCard from "./CountryCard";
//import LisActivities from './LisActivities'
import styles from './Home.module.css';
import Paginated from "./Paginated";
import style from './Button.module.css'

function Home() {
  
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const activities = useSelector((state)=> state.activities)
    const [order, setOrder] = useState('')
    //const [, setRefreshState] = useState(false) 
    //const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, /*setCountriesPerPage*/] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountry = allCountries.slice(indexOfFirstCountry,indexOfLastCountry)
    

    useEffect(() => {
       
        dispatch(getCountries(order));
        dispatch(getActivities())
        
    }, [dispatch,order])
    
    function populationOrder(e){
        e.preventDefault()
        setOrder(e.target.value)
    }


    function handleFilterByContinent(e){
        e.preventDefault()
         dispatch(filterByContinents(e.target.value));
         setCurrentPage(1)
       
    }

    function handleFilterByActivity(e){
       
        dispatch(filterActivity(e.target.value));
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
       
        
    }

    function handleSort(e){
     
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
    }
    
    const paginated =  (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    

    return (
        
        
        <div className={styles.page}>
            <header> 
             <Link to='/'>           
             <h1 className={styles.h1}>  Countries of World! 🌎   </h1>
             </Link>
            <Link to='/activity'> Make your own Activity </Link>
            </header>
        
        <div> 
        <div> 

            <select onChange={e=> populationOrder(e)}className={style.select}>
                <option  hidden>  Order by population     </option>
                <option value='DESC' >  Ascendent </option>
                <option value='ASC'>  Descendant </option>
            </select>
            <select onChange={e=>   handleSort(e)} className={style.select}>
                <option  hidden>    Order by name        </option>
                <option value='asc' >  Ascendant </option>
                <option value='desc'>  Descendant </option>
            </select>
            <select onChange={e => handleFilterByContinent(e)}  className={style.select}>
                <option value='All'>All Continents</option>
                <option value='Africa'>Africa</option>
                <option value='Americas'>America</option>
                <option value='Antarctic'>Antartica</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europa</option>
                <option value='Oceania'>Oceania</option>
            </select>
            <select onChange={e=> handleFilterByActivity(e)}  className={style.select}>
                <option value = 'All'>All Activities</option>
             {activities?.map(e=> (
                    <option value={e.name}
                            key={e.id}> {e.name} </option>
                    ))}
            </select>
        </div>
        </div>
         
            {  //loading? <img src= '../assets/giphy.gif' alt = 'Loading...'/>:
            <ul className={styles.container}> 

               {currentCountry?.map(e => (
                    <CountryCard
                    name={e.name} 
                    continent = {e.continent} 
                    img = {e.img}
                    subregion = {e.subregion}
                    id ={e.id}
                    key= {e.id}
                   />
                    ))}
            </ul>
            }
            <Paginated 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginated = {paginated}/>
        </div>
    )
}

export default Home