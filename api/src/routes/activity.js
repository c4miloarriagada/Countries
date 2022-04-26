const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router()




router.post('/', async(req, res)=>{
    const {name, difficult, duration, season} = req.body
    console.log(req.body)
    if(!name || !difficult || !duration || !season) 
    return res.send('All data is required')

    try{
        const activity = await Activity.create({name, difficult, duration, season}.body)
        return res.json(activity)
    }catch(error){
        return res.send('Error', error)
    }

})


module.exports  = router;