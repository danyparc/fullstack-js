const {Pelicula} = require('../models/Pelicula');
const {Director} = require('../models/Director');
const {Actor} = require('../models/Actor');

const pelicula = {};

pelicula.crearPelicula = function(pelicula){
    const newPelicula = Pelicula(pelicula);

    newPelicula.save((err, pelicula)=>{
        if (err) {
            console.log('Hubo un error al subir peli', err);
        }else{
            console.log('resultado: ', pelicula);
        }
    })
}

pelicula.mostrarPeliculas = function(populate = false){
    const find = populate ? Pelicula.find().populate('directores').populate('actores') : Pelicula.find();

    find.exec()
    .then(peliculas =>{
        if(!peliculas){
            console.log('No hay peliculas')
        }else if(populate){
            console.log(peliculas);
            console.log('Populate directores', peliculas[1].directores) 
            console.log('Populate actores', peliculas[1].actores) 
        }else{
            console.log('Peliculas: ', peliculas);
        }
    }).catch(err=> console.log('Error: ', err))
}
pelicula.borrarPelicula = function (idPeli) {
    Pelicula.deleteOne({_id: idPeli}).exec()
    .then(resp =>{
        resp ? console.log('respuesta', resp) : console.log('No hay peliculas')
    }).catch(err=> console.log('Error: ', err))
}

pelicula.actualizarPelicula= function (idPeli, pelicula) {
    Pelicula.updateOne({_id: idPeli}, pelicula ).exec()
    .then(resp =>{
        resp ? console.log('respuesta', resp) : console.log('No hay peliculas')
    }).catch(err=> console.log('Error: ', err))
}

const director = {}

director.crearDirector = function (director) {
    const ndirector = Director(director);
    ndirector.save((err, dir)=>{
        err 
        ? console.log('Algo falló', err)
        : console.log('Ok: ', dir); 
    });
}

const actor = {}

actor.crearActor = function (actor) {
    const nactor = Actor(actor);
    nactor.save((err, act)=>{
        err 
        ? console.log('Algo falló', err)
        : console.log('Ok: ', act); 
    });
}


exports.pelicula = pelicula;
exports.actor = actor;
exports.director = director;
