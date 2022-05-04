import axios from 'axios';

export function getCountryById(id){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/countries/' + id);
        const data = json.data
        return dispatch({
            type: 'GET_COUNTRY',
            payload: data
        })
    }
}


export  function getCountries(order){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/countries?order=' + order)
        const data = json.data
    return dispatch({
        type: 'GET_COUNTRIES',
        payload: data
        })
    }
}

export function getCountryByName(name){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/countries?name=' + name);
        const data = json.data
        return dispatch({
            type: 'GET_BY_NAME',
            payload: data
        })

    }
}


export  function getActivities(){
    return async function(dispatch){
        let json = await axios('http://localhost:3001/activity')
        const data = json.data
    return dispatch({
        type: 'GET_ACTIVITY',
        payload: data
        })
    }
}

export function postActivity(payload){
    return async function(dispach){
        const json = await axios.post('http://localhost:3001/activity', payload)
        return json
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
export const GET_COUNTRY = 'GET_COUNTRY'
export const GET_BY_NAME = 'GET_BY_NAME'