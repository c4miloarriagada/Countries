const { default: axios } = require('axios');


const uploadCountries = async (Country) => {

    try {
        const response = await axios.get('https://restcountries.com/v3/all')
        const countriesInfo = response.data
        let uploadedCountries = 0
        for (let i = 0; i < countriesInfo.length; i++) {
            const country = countriesInfo[i]
            if (!country.capital) 
                continue 
            const countryToAdd = {
                id: country.cca3,
                name: country.name.common,
                img: country.flags[0],
                continent: country.region,
                capital: country.capital[0],
                subregion: country.subregion,
                population: country.population,
                area: country.area
            }

            uploadCountry(countryToAdd);
            uploadedCountries++
        }
        console.log(`${uploadedCountries} Countries Added`)

     } catch (error) {

        console.log('Error al acceder a la informacion:', error)
    };

function uploadCountry(country) {
    try {
        Country.findOrCreate({
            where: {
                name: country.name
            },
                defaults: country
            });
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = uploadCountries