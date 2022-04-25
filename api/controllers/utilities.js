const axios = require('axios');
const {Country, Activity} = require('../src/db')



const getApiInfo = async()=>{
   try{ 
    const api = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await api.data.map(e => {
        return{
            name : e.name,
            img: e.flags,
            continent: e.continents,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population,

        };
    });
    return apiInfo; 
    }catch(error){
        console.log(error);
    }
}

const getDbInfo = async() =>{
    try{ 
    return await Country.findAll({
        include:{
            model: Activity,
            attributes: ['name', 'difficult', 'duration', 'season'],
            trough:{
                attributes: [],
            }
        }
    });
    }catch(error){
        console.log(error)
    }
}


const getAllCountries = async()=>{
    const  apiInfo = getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo
}

module.exports= {
    getApiInfo,
    getDbInfo,
    getAllCountries
}