var mongoose = require('mongoose')
var app = require('./app')
var port = 3700
mongoose.Promise = global.Promise;
//Cambiar si se pasa a Atlas
mongoose.connect(
  'mongodb+srv://admincmc:admin2020!@cluster0.b37xj.mongodb.net/cmc?retryWrites=true&w=majority' //Esto es con Mongo Atlas
//  'mongodb://localhost:27017/cmc' //Si se ejecuta en localhost
)
        .then(() => {
          console.log('Conexion exitosa');
          //Crear server
          app.listen(port, () => {
            console.log('Escuchando');
          })
        })
        .catch(e => {
          console.log(e);
        })
