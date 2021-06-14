const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use('/static', express.static(__dirname + '/public'));

// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/x3dom', function(req, res) {
    res.sendFile(path.join(__dirname, '/HelloX3DOM.html'));
});
app.get('/hapd3cation', function(req, res) {
    res.sendFile(path.join(__dirname, '/hapd3cation.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);