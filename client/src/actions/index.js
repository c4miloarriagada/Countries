import axios from 'axios';


 export function getCountryById(id){
        return async function(dispatch){
         const json = await axios.get('/countries/' + id);
         const data = json.data
         return dispatch({
             type: 'GET_COUNTRY',
             payload: data
         })
     }
 }

// export const getCountryById = (id) => dispatch =>{
//     return axios.get('/countries/' + id)
//     .then(response => response.data)
//     .then(data =>{
//          dispatch({
//             type: 'GET_COUNTRY',
//             payload: data
//         })
//     })
// }

 export  function getCountries(order){
     return async function(dispatch){
         const json = await axios.get('/countries?order=' + order)
         const data = json.data
     return dispatch({
         type: 'GET_COUNTRIES',
         payload: data
         })
     }
 }
// export const getCountries = (order) => dispatch =>{
//     return axios.get('/countries?order=' + order)
//     .then(response => response.data)
//     .then(data =>{
//         dispatch({
//             type: 'GET_COUNTRIES',
//             payload: data
//         })
//     })
// }

 export function getCountryByName(name){
     return async function(dispatch){
         const json = await axios.get('/countries?name=' + name);
         const data = json.data
         return dispatch({
             type: 'GET_BY_NAME',
             payload: data
            })
            
        }
 }
 
// export const getCountryByName = (name) => dispatch =>{
//     return axios.get('/countries?name=' + name)
//     .then(response => response.data)
//     .then(data =>{
//         dispatch({
//             type: 'GET_BY_NAME',
//             payload: data
//         })
//     })
// }

export function clearState(payload){
    return{
        type: 'CLEAR_STATE',
        payload
    }
 }
             
             
 export  function getActivities(){
    return async function(dispatch){
        let json = await axios.get('/activity')
        const data = json.data
    return dispatch({
        type: 'GET_ACTIVITY',
        payload: data
        })
    }
}

export function postActivity(payload){
    return async function(dispatch){
        const json = await axios.post('/activity', payload)
        return json
    }
}

// export function deleteActivity(id){
//  return async function(dispatch){
//      await axios.delete('/activity/' + id)
//      return dispatch({
//          type: 'DELETE_ACTIVITY'
//      })
//  }
// }

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
/*
export function filterByPopulationCondition(payload){
    return{
        type: 'FILTER_POPULATION_CONDITION',
        payload
    }
}*/

// export function filterByPopulation(payload){
//     return{
//         type: 'FILTER_BY_POPULATION',
//         payload
//     }
// }

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const CLEAR_STATE = 'CLEAR_STATE'
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY'
export const ORDER_BY_NAME  = 'ORDER_BY_NAME'
export const GET_ACTIVITY = 'GET_ACTIVITY'
export const GET_COUNTRY = 'GET_COUNTRY'
export const GET_BY_NAME = 'GET_BY_NAME'
//export const DELETE_ACTIVITY = 'DELETE_ACTIVITY'
// export const FILTER_POPULATION_CONDITION = 'FILTER_POPULATION_CONDITION'
// export const FILTER_BY_POPULATION = 'FILTER_BY_POPULATION'