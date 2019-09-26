const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    const mesas = [
        {id: 1, estado: 'ocupada'},
        {id: 2, estado: 'desocupada'}
    ];
    res.json(mesas);
});

app.get('/user', (req, res) => {
    const users = [
        {userName: "Betolan", password: '12345'}
    ];
    res.json(users);
});

app.post('/reservar',function(req,res){
    var id_mesa=req.body.id;
    var estado=req.body.estado;
    console.log("id_mesa = "+id_mesa+", estado = "+estado);
});

app.post('/llegada',function(req,res){
    var id=req.body.id;
    var llegada=req.body.llegada;
    console.log("id_mesa = "+id+", llegada = "+llegada);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
