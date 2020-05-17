//Modules
const express = require('express');
const fs = require('fs');
const config = require('./config');
const api = require('./api');
const app = express();

app.use(express.json());
app.use('/api',api);

//Server
app.listen(config.port, ()=> {
    console.log('Servidor Iniciado');
});