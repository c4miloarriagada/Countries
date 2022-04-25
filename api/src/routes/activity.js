const express = require('express');



const activityRoute = express.Router()

activityRoute.post('/activity')


module.exports  = activityRoute;