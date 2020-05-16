//Modules
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const config = require('./config');
const api = require('./api');
const app = express();

let accessLogStream = fs.createWriteStream('./files/access.log', { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json());
app.use('/api',api);

//Server
app.listen(config.port, ()=> {
    console.log('Servidor Iniciado');
});