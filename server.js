const diagram = require("./diagram.js")
const compiler = require('./compiler.js')
const serializer = require('./amf-serializer.js')

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

const hapd3cation_schema = require('./hapd3cationSchema.json');

const app = express();
const port = process.env.PORT || 8080;

app.use('/public', express.static(__dirname + '/public'));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/OpenJSCAD.org', express.static(__dirname + '/OpenJSCAD.org'));
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));

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
app.post('/jscad_diagram', function(req, res) {
    // console.dir(req);
    // console.dir(req.body);
    let jscadSpec = compiler.compile(req.body);

    res.json(diagram.assembly(jscadSpec));
});
app.get('/editor', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});
app.post('/download', function(req, res){
    serializer.serialize(req.body);
    // const file = `${__dirname}/tmp/hapd3cation.amf`;
    // res.download(file); // Set disposition and send it.
    res.sendStatus(200);
});
app.get('/download/:hapd3cationId', function(req, res){
    // serializer.serialize(req.body);
    let tmpFilePath = '/tmp/hapd3cation' + req.params.hapd3cationId + '.amf'
    const file = path.join(__dirname, tmpFilePath);
    res.download(file); // Set disposition and send it.
});
app.get('/hapd3cation-schema', function(req, res) {
    res.h
    res.jsonp(hapd3cation_schema);
});

app.listen(port);
console.log('Server started at http://localhost:' + port);