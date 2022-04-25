//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getCountries = require('./controllers/countries.js');
const server = require('./src/app.js');
const { db, Country } = require('./src/db.js');
const PORT = process.env.PORT
// Syncing all the models at once.
db.sync({ force: true })
.then(() => {
  console.log('================================')
  console.log('         DATA BASE OK           ')
  console.log('================================')
  getCountries(Country)
    .then(()=>{
      server.listen(PORT, () => {
      console.log(`Listening at ${PORT}`); // eslint-disable-line no-console
    })
  })
})
.catch(err => console.log('error: ', err))
