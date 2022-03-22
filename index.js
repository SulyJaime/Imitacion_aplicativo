var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require('morgan');


app.use(bodyParser.urlencoded({
    extended: true
}));

//Añadimos el CSS

app.use(express.static(__dirname + '/src/views'));

app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));

/* llamamos a EJS*/
var path = __dirname + '/src/views';
app.set('views', path);
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://jidajies:jinneth15@cluster0.4nzaw.mongodb.net/BioSalud?retryWrites=true&w=majority")
    .then(function (db) {
        console.log("Conectado a la BD");
    })
    .catch(function (err) {
        console.log(err);
    });

var Citas = require("./src/models/Citas");
var Pacientes = require("./src/models/pacientes");
const req = require("express/lib/request");

//Mostrar pagina principal
app.get("/inicio", async function (req, res) {
    var citas = await Citas.find();
    var pacientes = await Pacientes.find();

    res.render('index', {
        citas: citas,
        pacientes: pacientes
    });
});



//Insertar Cita
app.post("/agendar_cita", async function (req, res) {
    //Datos del paciente
    var paciente_existe = req.body.email;
    console.log(req.body.email);
    var busqueda = await Pacientes.findOne({
        email: paciente_existe
    });
    console.log(busqueda);

    if (busqueda != null) {
        var datos2 = req.body;
        var cita = new Citas(datos2);
        await cita.save();
        console.log("el paciente existe, se agrego cita ");
    } else {
        var datos2 = req.body;
        var cita = new Citas(datos2);
        await cita.save();
        var datos = req.body;
        var paciente = new Pacientes(datos);
        await paciente.save();
        console.log("paciente nuevo y cita agragadas")
    }

    console.log("Cita Agendada");
    res.redirect("/inicio");
});

//Login

app.get("/login", function (req, res) {
    res.sendFile(__dirname + '/login.html');
});

let Login = require('./src/models/login');
const {
    bus
} = require("nodemon/lib/utils");

app.post("/login", async function (req, res) {
    let datos = req.body;
    let login = new Login(datos);
    await login.save();
    console.log("Inicio de sesion EXITOSO");
    res.redirect("/profile");
});

app.get("/loginDos", function (req, res) {
    res.sendFile(__dirname + '/loginDos.html');
    res.redirect("/login");
});

app.get("/masSobre", function (req, res) {
    res.sendFile(__dirname + '/news-detail.html');
});

//Muestra el perfil (listado de clientes)
app.get('/profile', async function (req, res) {
    var perfil = await Pacientes.find();

    res.render('profile', {
        perfiles: perfil
    });
});

//Ver detalle
app.get('/detalle/:email/:peso', async function (req, res) {
    var detallesCitas = req.params.email;
    var busqueda = await Pacientes.findOne({
        email: detallesCitas
    });
    console.log(busqueda);

    var pCita = await Citas.findOne({
        email: detallesCitas
    });
    console.log(pCita);
    
    res.render('detalle', {
        cit: pCita
    });

});

//Modificar
app.get('/modificar/:email', async function (req, res) {
    var email = req.params.email;
    console.log(req.body);
    console.log(req.params);
    var pCita = await Citas.findOne({
        email: email
    });
    console.log(pCita);
    res.render('formularioProfile', {
        nuevo: false,
        cit: pCita
    });

});

app.post('/modificar', async function (req, res) {
    var datos2 = req.body;
    console.log("pepito");
    console.log(req.params);
    await Citas.updateOne({
        email: req.body.email
    }, datos2);
    var pCita = await Citas.findOne({
        email: req.body.email
    });
    console.log(pCita);
    res.redirect("/profile");

});

app.listen(3000);