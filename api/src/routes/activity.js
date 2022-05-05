const express = require('express');
const { Country, Activity, Country_activities } = require('../db')
const Model = require('../models/Activity')
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const findActivity = await Activity.findAll({
            include: {
                model: Country,

            }
        })
        return res.json(findActivity)
    } catch (error) {
        res.status(400).send(error)
    }
});



router.post('/', async (req, res) => {

    try {
        const { name, difficult, duration, season, country } = req.body

        const newActivity = await Activity.create({
            name,
            difficult,
            duration,
            season
        })
        console.log(req.body)

        country.forEach(async (country) => {
            const activityCountry = await Country.findOne({
                where: {
                    name: country
                }
            })
            await newActivity.addCountry(activityCountry)
        });
        res.status(200).send('Activity created successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('Activity cant be created ', error)
    }

    // const { difficult, duration } = req.body;
    // const name = req.body.name.toLowerCase()
    // const season = req.body.season.toLowerCase();
    // const country = req.body.country[0].toUpperCase().concat(req.body.country.slice(1).toLowerCase());
    // const seasons = ['summer', 'autumn', 'spring', 'winter'];
    // const level = ['1', '2', '3', '4', '5'];

    //  if (name === '' || typeof name !== 'string') return res.status(404).send('Must include a name');
    //  if (difficult === '' || (!level.includes(difficult))) return res.status(404).send('Must include a valid difficult. min: 1 max: 5');
    //  if (season === '' || (!seasons.includes(season))) return res.status(404).send('Must include a valid season. Summer - Autumn - Spring -Winter');
    //  if (duration === '') return res.status(404).send('Must include a duration');
    //  if (country === '') return res.status(404).send('Must include a valid Country');

    // try {

    //    console.log(name, difficult, duration,season)
    //     const findActivity = await Activity.findOne({
    //         where: {
    //             name,
    //             difficult,
    //             duration,
    //             season,

    //         },
    //     });

    //     const findCountry = await Country.findOne({
    //         where: {
    //             name: country
    //         },
    //     });

    //     if (!findCountry) return res.send('Country doesnt exist')
    //     if (!findActivity) {

    //         const createActivity = await Activity.create({ name, difficult, duration, country, season })
    //         createActivity.addCountry(findCountry);
    //         return res.status(201).json(createActivity)

    //     } else {

    //         const compareActivitiesById = await Country_activities.findByPk(findCountry.dataValues.id)
    //         if (compareActivitiesById) return res.status(400).send('The country already has the activity')
    //         findActivity.addCountry(findCountry)
    //         return res.status(201).json(findActivity)
    //     }

    // } catch (error) {
    //     return res.status(404).send('error', error)
    // }

});

/*
router.put('/:id', async(req, res)=>{
    const id = req.params.id.toUpperCase()
    const {name, difficult,duration, season } = req.body
    const findId = await Country_activities.findByPk(id)
    const putActivity = await Activity.findByPk(findId.dataValues.activityId) 
    
   try {
    if(putActivity){
        await putActivity.setActivity({name, difficult,duration, season })
        return res.json(putActivity)
        }
   } catch (error) {
       return res.status(400).send(error)
   }
   

})*/



router.delete('/:id', async (req, res) => { //delete activity that match with the name and id country

    try {

        const name = req.body.name.toLowerCase()
        const id = req.params.id.toUpperCase()

        const activityDestroy = await Activity.findOne({
            where: {
                name: name
            }
        });

        const deleteActivities = await Country_activities.findOne({
            where: {
                countryId: id

            },

        });


        if (activityDestroy && !deleteActivities) return res.status(400).send(`Doesnt exist has any activity called ${name} related with the id: ${id}`)

        if (deleteActivities) {
            deleteActivities.destroy({
                where: {
                    countryId: id
                }
            })
            return res.send('The Activity was deleted successfully')
        }

    } catch (error) {

        return res.status(500).json({ Server_Status: `ID Country doesnt has any activity or is invalid` })

    }
});


module.exports = router;