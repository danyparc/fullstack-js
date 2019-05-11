const {Pelicula} = require('./Pelicula');


function crearPelicula(){
    const newPelicula = Pelicula({
        titulo: 'Requiem for a dream',
        anio: '2000',
        sinopsis: 'Harry (Jared Leto) y su madre (Ellen Burstyn) tienen sueños muy distintos: ella está permanentemente a dieta esperando el día en que pueda participar en su concurso televisivo preferido; la ambición de Harry y su novia Marion (Jennifer Connelly) es hacerse ricos vendiendo droga',
        duracion: 102,
        genero: 'DRAMA',
        portada_url: 'http://es.web.img2.acsta.net/medias/nmedia/18/90/11/71/20081723.jpg',
        directores:[{name: 'Darren Aronofsky'}],
        actores:[{name: 'Jared Leto'}]
    });

    newPelicula.save((err, pelicula)=>{
        if (err) {
            console.log('Hubo un error al subir peli', err);
        }else{
            console.log('resultado: ', pelicula);
        }
    })
}

crearPelicula();