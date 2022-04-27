const express = require('express');
const { Country, Activity } = require('../db')
const Model = require('../models/Activity')
const router = express.Router()

router.post('/', async (req, res) => {


    const { name, difficult, duration  } = req.body;
    const season = req.body.season.toLowerCase();
    const country = req.body.country[0].toUpperCase().concat(req.body.country.slice(1).toLowerCase());
    const seasons = ['summer', 'autumn', 'spring', 'winter'];
    const level = ['1', '2', '3', '4', '5'];
   
    if (name === '' || typeof name !== 'string') return res.status(404).send('Must include a name');
    if (difficult === '' || (!level.includes(difficult))) return res.status(404).send('Must include a valid difficult. min: 1 max: 5') ;
    if (season === '' || (!seasons.includes(season))) return res.status(404).send('Must include a valid season. Summer - Autumn - Spring -Winter');
    if (duration === '') return res.status(404).send('Must include a duration');
    if (country === '') return res.status(404).send('Must include a valid Country');

    try {

        const findActivity = await Activity.findOne({
            where: {
                name,
                difficult,
                duration,
                season,
                  
            },
            include: Country
           
        })
 
        const findCountry = await Country.findOne({
            where:{
                name: country
            }
        })

        if(!findCountry)  res.send('Country doesnt exist')
        if (!findActivity || country != country) {

            const createActivity = await Activity.create({name, difficult, duration,  country, season})
            createActivity.addCountry(findCountry)
            res.status(201).json(createActivity)
            
        } else {
            return res.status(400).send('The Activity Was Created')
        }
    } catch (error) {
        res.status(404).send('error', error)
    }


});


module.exports = router;