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
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {getTypes} = require('./src/controller/data');

//Test BD
const {Pokemon, Type} = require('./src/db');



// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await getTypes()
  // Test BD
  let prueba = await Pokemon.create({
    name: 'Prueba',
    hp: 2,
    attack: 3,
    defense: 4,
    speed: 5,
    height: 20,
    weight: 5,
    image: 'https://cdn.theorg.com/d3119e0e-8202-4034-85ce-d0356382515e_thumb.jpg',
    moves: 'n' 

  })
  let type = await Type.findOne({
    where:{
      name: 'normal'
    }
  })
  await prueba.addType([type])
  //--------------

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
