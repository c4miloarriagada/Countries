const express = require('express')
const { Country, Activity } = require('../db')
const { Op } = require('sequelize')
const router = express.Router()

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    const {name} = req.query
    
    if (name) {
      Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        // order: [
        //     ['name', 'ASC']
        // ],
        // attributes: [
        //     'name', 'code',
        // ],
        include: Activity
      })
        .then((country) => {
          if (country.length === 0) {
            return res.send('No se encontró el país')
          }
          return res.send(country)
        })
    } else {
      Country.findAll({
        order: [
          ['name', 'ASC']
        ],
        attributes: [
          'name', 'code', 'flagImg', 'region', 'population'
        ],
        include: Activity
      })
        .then((country) => {
          return res.json(country)
        })
    }
  })





module.exports = router;
