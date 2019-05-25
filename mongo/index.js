const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Ctrl = require('./controllers/index');
const {Pelicula} = require('./models/Pelicula');
const {Director} = require('./models/Director');

const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//Obteniendo 
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const PORT = process.env.PORT || 3000;


const URL_MONGO = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-ijbr8.mongodb.net/test?retryWrites=true`;

console.log(URL_MONGO);


mongoose.connect(URL_MONGO, { useNewUrlParser: true },(err)=>{
    if(err){
        console.log('Hubo un error', err);
    }else{
        console.log('Conexión exitosa');
    }
});

app.get('/peliculas',(req, res)=>{
    Ctrl.pelicula.mostrarPeliculas()
        .then(peliculas =>{
            if(!peliculas){
                console.log('No hay peliculas');
                res.send({mensaje:'No hay peliculas'});
            }else{
                console.log('Peliculas: ', peliculas);
                res.send(peliculas).statusCode(200);
            }
        }).catch(err=>{ 
            console.log('Error: ', err)
            res.statusCode(500).send({mensaje: 'Algo salio mal'});
        })
});

//PARAMS
app.get('/peliculas/:id', (req,res)=>{
    Ctrl.pelicula.mostrarPeliculas(req.params.id)
        .then(peli=> peli ? res.send(peli) : res.send({}).statusCode(400))
        .catch(err=> res.send(err).statusCode(400));
})

app.post('/peliculas',(req,res)=>{
    const objPelicula = req.body;
    // Primero debemos ver si existe director:
    if(!objPelicula.directores){
        res.send('Ingresar director valido').statusCode(406)
    }else{
        // Pendiente
        // objPelicula.directores = subirDirectores(objPelicula.directores, res);
        console.log("\n\n***PELI****",objPelicula,"\n\n");
        
        const nuevaPeli = Pelicula(objPelicula);
        nuevaPeli.save((err, peli)=>{
            err ? res.send(err).statusCode(400) 
            : res.send(peli).statusCode(201);
        });
    }
});

async function subirDirectores(directores, res){
    let idsDirectores = []
    await directores.map((dir, i) => {
        Director(dir).save((err,director)=>{
            if(err){
                res.send('Error al subir director '+i, err).statusCode(406);
            }else{
                idsDirectores.push(director.id)
            }
        })
    });
    return idsDirectores;
}


//ACTORES

app.get('/actores',(req, res)=>{
    Ctrl.actor.mostrarActores()
        .then(actores=> actores ? res.send(actores) : res.send({}).statusCode(400))
        .catch(err=> res.send(err).statusCode(400));
})
app.get('/actores/:id',(req, res)=>{
    Ctrl.actor.mostrarActores(req.params.id)
        .then(actores=> actores ? res.send(actores) : res.send({}).statusCode(400))
        .catch(err=> res.send(err).statusCode(400));
})

//DIRECTORES

app.get('/directores',(req, res)=>{
    Ctrl.director.mostrarDirectores()
        .then(directores=> directores ? res.send(directores) : res.send({}).statusCode(400))
        .catch(err=> res.send(err).statusCode(400));
})
app.get('/directores/:id',(req, res)=>{
    Ctrl.director.mostrarDirectores(req.params.id)
        .then(directores=> directores ? res.send(directores) : res.send({}).statusCode(400))
        .catch(err=> res.send(err).statusCode(400));
})


app.listen(PORT,()=>{
    console.log('App escuchando en el puerto '+PORT);
})