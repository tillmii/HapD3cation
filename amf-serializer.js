const fs = require('fs');
const path = require('path');

const amfSerializer = require('@jscad/amf-serializer')

function serialize(jscadObject) {
    console.log("Received Object:");
    console.log(jscadObject);

    let amfData = amfSerializer.serialize({unit: 'millimeter'}, jscadObject);

    // console.log("amf Data:");
    // console.log(amfData);

    let tmpFilePath = '/tmp/hapd3cation' + jscadObject[0].id.toString() + '.amf';

    fs.writeFile(path.join(__dirname, tmpFilePath), amfData[0], function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    return true;
}

module.exports = { serialize }