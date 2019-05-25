const Controllers = require('./controllers/index');

const quentin = {
    name: 'Quentin Tarantino',
    edad: 56,
    nacionalidad: 'USA',
    premios:[
        'Oscar 1995: Mejor guion',
        'Oscar 2013: Mejor guion'
    ],
    debut: 1983,
    experiencia: 42
}
Controllers.pelicula.mostrarPeliculas();
// Controllers.actor.crearActor(quentin);
// Controlador.director.crearDirector(quentin);