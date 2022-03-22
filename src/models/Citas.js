var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Citas = new Schema({
    fnacimiento:String,
    dependencia:String,
    observaciones:String,
    profesional:String,
    email: String,
    
    diagnostico: String,
    antecedentes: String,
    peso: String,
    talla: String
});

module.exports = mongoose.model("Citas", Citas);