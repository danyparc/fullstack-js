const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peliSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    anio: String,
    sinopsis: String,
    duracion:{
        type: Number,
        default: 90
    },
    genero: {
        type: String,
        enum: ['DRAMA', 'SCIFI', 'TERROR','THRILLER']
    },
    portada_url: String,
    directores: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Director'
        }],
        required: true
    },
    actores:{
        type:[{
            type: Schema.Types.ObjectId,
            ref: 'Actor'
        }]
    }
},{timestamps: true});

const Pelicula = mongoose.model('Pelicula', peliSchema);

module.exports = {Pelicula};