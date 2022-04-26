const express = require('express');
const { Country, Activity } = require('../db')
const Model= require('../models/Activity')
const router = express.Router()









router.post('/', async(req, res)=>{
 /*
    const {name, difficult, duration, season, country} = req.body
   const seasons = ['summer', 'autumn', 'spring', 'winter'] 
   const level = ['1','2','3','4','5']
  
   
   if(name === '' || typeof name !== 'string') return res.status(404).send('Must include a name')
   if(difficult === '' || (!level.includes(difficult))) return res.status(404).send('Must include a valid difficult. min: 1 max: 5')
   if(season === '' || (!seasons.includes(season))) return res.status(404).send('Must include a valid season. summer - autumn - spring -winter')
   if(duration === '') return res.status(404).send('Must include a duration') 
   if(country === '') return res.status(404).send('Must include a valid Country')

   
   const findActivityExist = await Activity.findAll({
     where:{
         name,
         difficult,
         duration,
         season
     }
       
   })

   
   if(findActivityExist === null){
       const create = await Activity.create({
           name,
           difficult,
           duration,
           season
        })
        country.map(e=>{
            Country.findAll({
                where:{
                    id:{
                        [Op.eq] : e
                    }
                }
            })
            create.addCountry(country)
        })
        res.json(country)
    }

*/

    const {name, difficult, duration, season, country} = req.body
    const seasons = ['summer', 'autumn', 'spring', 'winter'] 
    const level = ['1','2','3','4','5']
   
    
    if(name === '' || typeof name !== 'string') return res.status(404).send('Must include a name')
    if(difficult === '' || (!level.includes(difficult))) return res.status(404).send('Must include a valid difficult. min: 1 max: 5')
    if(season === '' || (!seasons.includes(season))) return res.status(404).send('Must include a valid season. summer - autumn - spring -winter')
    if(duration === '') return res.status(404).send('Must include a duration') 
    if(country === '') return res.status(404).send('Must include a valid Country')
 
    
    try {
        const createActivity = await Activity.create(req.body)
        res.status(201).json(createActivity)
    } catch (error) {
        res.status(404).send('error')
    }



})


module.exports  = router;