var express = require('express');
var app = express();

app.use(express.static('assets'));


//ESTO ES UNA RUTA, la ruta principal
app.get('/',function(req, res){
    res.sendFile(__dirname + '/src/index.html', function(err) {
        console.log('ERROR', err);
    })
});

//Crear una nueva ruta 'persona' que me envíe un objeto


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});