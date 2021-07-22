const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use('/public', express.static(__dirname + '/public'));
app.use('/OpenJSCAD.org', express.static(__dirname + '/OpenJSCAD.org'));

// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/index.html'));
});
app.get('/d3_example', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/d3_example.html'));
});
app.get('/vega_example', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/vega_example.html'));
});
app.get('/x3dom', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/HelloX3DOM.html'));
});
app.get('/hapd3cation', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/hapd3cation.html'));
});
app.get('/studie01', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/study_data_01.html'));
});
app.get('/studie02', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/study_data_02.html'));
});
app.get('/studiendaten1', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/study_data_03.html'));
});
app.get('/studiendaten2', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/study_data_04.html'));
});
app.get('/beschreibung', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/study_description.html'));
});
app.get('/jscad', function(req, res) {
    res.sendFile(path.join(__dirname, '/lib/html/jscad_hapd3cation.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);