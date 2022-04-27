const {Country, Activity} = require('../src/db');
const {Op} = require('sequelize');


const getCountry =  async(req, res)=>{
    const {name} = req.query
    try {
      
      if(name){
        const queryCountry = await Country.findAll({
          where:{
            name:{
             [Op.iLike] : `%${name}%` 
            }
          },
          include: Activity 
        })
        if(queryCountry.length === 0){
  
          return res.status(404).send('Search Failed')
        }
        return res.json(queryCountry)
      }else{
        const listCountry = await Country.findAll({
          order:[
           ['name', 'ASC']
          ],
          attributes:[
            'id','name', 'img','subregion', 'population'
          ],
         })
         return  res.send(listCountry)
      }
    } catch (error) {
      res.status(500).send('ERROR',error)
    }
  }


  module.exports = {getCountry};
