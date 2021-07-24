const superagent = require('superagent');

const viewer = require('./viewer');

superagent.get('/jscad_diagram').then((res, err) => {
    if (err) {
        console.log("Error fetching the diagram");
        console.log(err);
    } else {
        console.log("Received the diagram");
        viewer(res.body, true, true);
    }
})