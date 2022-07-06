const express = require("express");
const expressws = require("express-ws");
const ee = require("events").EventEmitter;

const Cc = new ee();
const app = expressws(express()).app;

app.set('view engine', 'ejs')

app.engine('html', require('ejs').__express)

app.get('/', (req, res) => {
    res.render('index.html')
});

app.ws('/', (ws, req) => {
    ws.send(JSON.stringify({
        message: 'Welcome to the Real Time Web Chat'
    }));
    ws.on('message', (msg) => Cc.emit('message', msg));
    Cc.on('message', (data) => ws.send(data))
});

app.listen(8080)