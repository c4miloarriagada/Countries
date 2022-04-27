const e = require('express');
const express = require('express');
const { Country, Activity, Country_activities } = require('../db')
const Model = require('../models/Activity')
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const findActivity = await Activity.findAll({
            attributes: [
                'id', 'name', 'duration', 'season', 'difficult'
            ],
            include: {
                model: Country,
                attributes: ['id', 'name', 'img']
            }
        })
        return res.json(findActivity)
    } catch (error) {
        res.status(400).send(error)
    }
})



router.post('/', async (req, res) => {

    const { name, difficult, duration } = req.body;
    const season = req.body.season.toLowerCase();
    const country = req.body.country[0].toUpperCase().concat(req.body.country.slice(1).toLowerCase());
    const seasons = ['summer', 'autumn', 'spring', 'winter'];
    const level = ['1', '2', '3', '4', '5'];

    if (name === '' || typeof name !== 'string') return res.status(404).send('Must include a name');
    if (difficult === '' || (!level.includes(difficult))) return res.status(404).send('Must include a valid difficult. min: 1 max: 5');
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
        });

        const findCountry = await Country.findOne({
            where: {
                name: country
            },
        });

        if (!findCountry) return res.send('Country doesnt exist')
        if (!findActivity) {

            const createActivity = await Activity.create({ name, difficult, duration, country, season })
            createActivity.addCountry(findCountry);
            return res.status(201).json(createActivity)
        } else {

            const compareActivitiesById = await Country_activities.findByPk(findCountry.dataValues.id)
            if (compareActivitiesById) return res.status(400).send('The country already has the activity')
            findActivity.addCountry(findCountry)
            return res.status(201).json(findActivity)
        }

    } catch (error) {
        return res.status(404).send('error', error)
    }


});




router.delete('/:id', async (req, res) => { //delete all activities from id country
    try {
        const { name } = req.body
        const id = req.params.id.toUpperCase()
        const deleteActivities = await Country_activities.findByPk(id);
        const activityDestroy = await Activity.findByPk(deleteActivities.dataValues.activityId);

        if (activityDestroy.dataValues.name != name) return res.send(`Doesnt exist has any activity called ${name}`)
        if (deleteActivities) {
            activityDestroy.destroy()
            return res.send('The Activity was deleted successfully')
        }


    } catch (error) {

        res.status(400).send(`ID Country doesnt exist`)

    }
});


module.exports = router;