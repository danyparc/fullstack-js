const mongoose = require('mongoose');
var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

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

actorSchema.plugin(mongoose_fuzzy_searching,{fields: ['name']})

const Actor = mongoose.model('Actor', actorSchema);

module.exports = {Actor};