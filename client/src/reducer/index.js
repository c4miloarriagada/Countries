import {
    GET_COUNTRIES,
    FILTER_BY_CONTINENT,
    FILTER_ACTIVITY,
    ORDER_BY_NAME,
    CLEAR_STATE,
    GET_ACTIVITY,
    GET_COUNTRY,
    GET_BY_NAME,
} from "../actions";

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    country: []


}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case GET_COUNTRY:
            return {
                ...state,
                country: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }
        case GET_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }
        case CLEAR_STATE:
            return{
                ...state,
                country: {}
            }
         case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries
            const continentFilter = action.payload === 'All'
                ? allCountries
                : allCountries.filter(e => e.continent === action.payload)
            return {
                ...state,
                countries: continentFilter
            }
        case FILTER_ACTIVITY:
          
            const allCountriesAct = state.allCountries
            const activitiesFilter = action.payload === 'All'
                ? allCountriesAct
                : allCountriesAct.filter(c => c.activities && c.activities.map(e => e.name).includes(action.payload))

            return {
                ...state,
                countries: activitiesFilter
            }
        case ORDER_BY_NAME:
            const sortCountries = action.payload === 'asc'
                ? state.allCountries.sort((a, b) => a.name.localeCompare(b.name))
                : state.allCountries.sort((a, b) => b.name.localeCompare(a.name))
            
            return {
                ...state,
                countries: sortCountries

            }
        /*case FILTER_POPULATION_CONDITION:
            const filterPopulationCondition = state.allCountries.filter(e=> e.population <= 19116209)
            return{
                ...state,
                countries: filterPopulationCondition
            }*/
        // case FILTER_BY_POPULATION:
            
        //     const filterPopulation = action.payload === 'ASC'
            
        //     ? state.allCountries.sort((a,b)=>{
               
        //         return Number(a.population) < Number(b.population)
        //         ? 1
        //         : Number(a.population) < Number(b.population)
        //         ? -1
        //         : 0;
                    
        //     })
        //     : state.countries.sort((a,b)=>{
        //         return Number(a.population) > Number(b.population)
        //         ? 1
        //         : Number(a.population) < Number(b.population)
        //         ? -1
        //         : 0;
        //     })
        //     return{
        //         ...state,
        //         countries: filterPopulation
        //     }

        default: return state;
    }

}




export default rootReducer;   

/*
return Number(a.population) > Number(b.population)
? 1
: Number(a.population) < Number(b.population)
? -1
: 0;
*/