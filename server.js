const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use('/static', express.static(__dirname + '/public'));

// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/d3_example', function(req, res) {
    res.sendFile(path.join(__dirname, '/d3_example.html'));
});
app.get('/vega_example', function(req, res) {
    res.sendFile(path.join(__dirname, '/vega_example.html'));
});
app.get('/x3dom', function(req, res) {
    res.sendFile(path.join(__dirname, '/HelloX3DOM.html'));
});
app.get('/hapd3cation', function(req, res) {
    res.sendFile(path.join(__dirname, '/hapd3cation.html'));
});
app.get('/studie01', function(req, res) {
    res.sendFile(path.join(__dirname, '/study_data_01.html'));
});
app.get('/studie02', function(req, res) {
    res.sendFile(path.join(__dirname, '/study_data_02.html'));
});
app.get('/studiendaten1', function(req, res) {
    res.sendFile(path.join(__dirname, '/study_data_03.html'));
});
app.get('/studiendaten2', function(req, res) {
    res.sendFile(path.join(__dirname, '/study_data_04.html'));
});
app.get('/beschreibung', function(req, res) {
    res.sendFile(path.join(__dirname, '/study_description.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);