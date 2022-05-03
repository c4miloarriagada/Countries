import axios from 'axios';

export function getCountriesByPopulation(order){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/api/countries?order=' + order);
        const data = json.data
        return dispatch({
            type: 'GET_POPULATION',
            payload: data
        })
    }
}


export  function getCountries(order){
    return async function(dispatch){
        let json = await axios('http://localhost:3001/countries?order=' + order)
        const data = json.data
    return dispatch({
        type: 'GET_COUNTRIES',
        payload: data
        })
    }
}
export  function getActivities(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/activity')
        const data = json.data
    return dispatch({
        type: 'GET_ACTIVITY',
        payload: data
        })
    }
}

export function filterByContinents(payload){
  
    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function filterActivity(payload){
    return {
        type: 'FILTER_ACTIVITY',
        payload
    }
}

export function orderByName(payload){
   
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}



export const GET_COUNTRIES = 'GET_COUNTRIES';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY'
export const ORDER_BY_NAME  = 'ORDER_BY_NAME'
export const GET_ACTIVITY = 'GET_ACTIVITY'
export const GET_POPULATION = 'GET_POPULATION'