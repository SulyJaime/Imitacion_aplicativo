var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Pacientes = new Schema({
    nombre:String,
    apellido: String,
    email:String,
    telefono:Number,
    familiar:Number,
    direccion: String,
    fecha: String
});

module.exports = mongoose.model("Pacientes", Pacientes);