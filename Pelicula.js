const mongoose = require('mongoose');
const URL_MONGO = 'mongodb+srv://dany:<password>@cluster0-ijbr8.mongodb.net/test?retryWrites=true'

mongoose.connect(URL_MONGO, { useNewUrlParser: true },(err)=>{
    if(err){
        console.log('Hubo un error', err);
    }else{
        console.log('Conexión exitosa');
    }
});

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
            name: {
                type: String,
                required: true
            },
            edad: {
                type: Number,
                default: 18
            },
            nacionalidad: String
        }],
        required: true
    },
    actores:{
        type:[{
            name: String,
            edad: {
                type: Number,
                default: 18
            },
            nacionalidad: String
        }]
    }
},{timestamps: true});

const Pelicula = mongoose.model('Pelicula', peliSchema);

module.exports = {Pelicula};