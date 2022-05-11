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



// router.get('/', (req, res)=>{
//    return Activity.findAll({
//        include:{
//            model: Country
//        }     
//    }).then((activity)=>{
//        return res.json(activity)
//    }).catch(err => console.log('error', err))
// })



router.post('/', async (req, res) => {

    try {
        const { name, difficult, duration, season, country } = req.body

        const newActivity = await Activity.create({
            name,
            difficult,
            duration,
            season
        })

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
});




router.delete('/:id', async (req, res) => { //delete activity that match with the name and id country
    
    try {
        
        const name = req.body.name
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

module.exports = router;