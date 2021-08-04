const superagent = require('superagent');

const Split = require('split.js');

const viewer = require('./viewer');

superagent.get('/jscad_diagram').then((res, err) => {
    if (err) {
        console.log("Error fetching the diagram");
        console.log(err);
    } else {
        console.log("Received the diagram");
        viewer(document.getElementById('jscad'), res.body, true, true);
    }
})

Split(['#split-0', '#split-1'])
Split(['#split-2', '#split-3'], {
    direction: 'vertical',
})