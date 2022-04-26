const express = require('express')
const router = express.Router()
const countriesRoute = require('./country');
const activityRoute = require('./activity');



router.use('/countries', countriesRoute)


module.exports = router
