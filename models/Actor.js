const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        default: 18
    },
    nacionalidad: String,
    premios: [String],
    experiencia: Number,
    debut: Date
},{timestamps: true});

const Actor = mongoose.model('Actor', actorSchema);

module.exports = {Actor};