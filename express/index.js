var express = require('express');

var app = express();

app.use(express.static('assets'));


//ESTO ES UNA RUTA, la ruta principal
app.get('/',function(req, res){
    res.sendFile(__dirname + '/src/index.html', function(err) {
      if(err){
        console.log('ERROR', err);
      }
    })
});

//Crear una nueva ruta 'persona' que me envíe un objeto
app.get('/persona',(req, res) => {
  var persona = {
    nombre: 'Daniel',
    nacionalidad: 'México',
    genero: 'M',
    edad: 24
  }
  res.send(persona)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});