import {
    GET_COUNTRIES,
    FILTER_BY_CONTINENT,
    FILTER_ACTIVITY,
    ORDER_BY_NAME,
    GET_ACTIVITY,
    GET_COUNTRY,
    GET_BY_NAME
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
            let sortCountries = action.payload === 'asc'
                ? state.countries.sort((a, b) => a.name.localeCompare(b.name))
                : state.countries.sort((a, b) => b.name.localeCompare(a.name))
            console.log(sortCountries)
            return {
                ...state,
                countries: sortCountries

            }




        default: return state;
    }

}




export default rootReducer;