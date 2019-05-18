const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const directorSchema = new Schema({
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
},{timestamps: true});

const Director = mongoose.model('Director', directorSchema);

module.exports = {Director};