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

pelicula.mostrarPeliculas = function(id = '', populate = false){
    if(id){
        return Pelicula
            .findById(id)
            .populate('directores')
            .populate('actores')
            .exec();
    }
    const find = populate ? Pelicula.find().populate('directores').populate('actores') : Pelicula.find();
    return find.exec();
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

director.mostrarDirectores = function(id=''){
    return id ? Director.findById(id).exec() : Director.find().exec();
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

actor.mostrarActores = function(id=''){
    return id ? Actor.findById(id).exec() : Actor.find().exec();
}


exports.pelicula = pelicula;
exports.actor = actor;
exports.director = director;
