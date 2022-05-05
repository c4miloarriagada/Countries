import React, { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, filterByContinents, filterActivity, orderByName, getActivities } from "../actions";
import { Link } from 'react-router-dom'
import CountryCard from "./CountryCard";
//import LisActivities from './LisActivities'
import styles from './Home.module.css';
import Paginated from "./Paginated";
import Nav from './Nav'
import style from './Button.module.css'

function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.activities)
    const [order, setOrder] = useState('')
    //const [, setRefreshState] = useState(false) 
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, /*setCountriesPerPage*/] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    useEffect(() => {
        setLoading(true)
        dispatch(getCountries(order));
        dispatch(getActivities())
        setLoading(false)
    }, [dispatch, order])

    function populationOrder(e) {
        e.preventDefault()
        setOrder(e.target.value)
    }


    function handleFilterByContinent(e) {
        e.preventDefault()
        dispatch(filterByContinents(e.target.value));
        setCurrentPage(1)

    }

    function handleFilterByActivity(e) {
        e.preventDefault()
        dispatch(filterActivity(e.target.value));
        setCurrentPage(1)
        setOrder()


    }

    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const HandleReload = () => {
        window.location.reload();
      };

    return (
        

        <div className={styles.page}>
            <header>
                <ul className={styles.ul}>
                 {/* <li className={styles.li}><Link to={'/home'}> Home </Link> </li> */}
                <li className={styles.li}> <button type='button'onClick={() => HandleReload()}>Refresh</button></li> 
                <li className={styles.li}><Nav/> </li>
                <li className={styles.li}><Link to='/activity'> Create activity</Link></li>
                <li className={styles.li}><Link to='/About'> About </Link></li>
               <div className={styles.mov}> 
                <select onChange={e => populationOrder(e)} className={styles.select}>
                        <option hidden>  Order by population     </option>
                        <option value='DESC' >  Ascendent </option>
                        <option value='ASC'>  Descendant </option>
                    </select>
                    <select onChange={e => handleSort(e)}className={styles.select}>
                        <option hidden>    Order by name        </option>
                        <option value='asc' >  A-Z </option>
                        <option value='desc'>  Z-A </option>
                    </select>
                    <select onChange={e => handleFilterByContinent(e)}className={styles.select}>
                        <option value='All'>All Continents</option>
                        <option value='Africa'>Africa</option>
                        <option value='Americas'>America</option>
                        <option value='Antarctic'>Antartica</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europa</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                    
                    <select onChange={e => handleFilterByActivity(e)}className={styles.select}>
                        <option hidden>All Activities</option>
                        {activities?.map(e => (
                            <option value={e.name}
                                    key={e.id}> {e.name} </option>
                        ))}
                    </select>
                    </div>
                </ul>
                </header>
            <div>
                <div className={styles.customselect}>
              
                   
                </div>
            </div>
            <div> 
            <h1 className={styles.h1}>  Countries Of The World! 🌎   </h1>
            { loading? <img src= '../assets/giphy.gif' alt = 'Loading...'/>:
                <ul className={styles.container}>

                    {currentCountry?.map(e => (
                        <CountryCard
                            name={e.name}
                            continent={e.continent}
                            img={e.img}
                            subregion={e.subregion}
                            id={e.id}
                            key={e.id}
                        />
                    ))}
                </ul>
            }
            </div>
            <div className={styles.paginated}>

            <Paginated
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginated={paginated} />

            </div>
        </div>
    )
}

export default Home