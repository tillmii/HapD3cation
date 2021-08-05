import React from "react";
import ReactDOM from "react-dom";

import _ from 'lodash';
import './style.css';
import '../public/css/split.css'

import viewer from '../cjs/viewer'
import superagent from 'superagent'
import Split from 'split.js'

import * as monaco from 'monaco-editor'

function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    return element;
}

Split(['#split-0', '#split-1'])
Split(['#split-2', '#split-3'], {
    direction: 'vertical',
})

let editor = monaco.editor.create(document.getElementById("editor"), {
    value: "function hello() {\n\talert('Hello world!');\n}",
    language: "javascript",
    minimap: {
        enabled: false
    },
});

class Game extends React.Component {
    render() {
        return (
        <div>
            Test Wohooo
        </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('test3')
);

superagent.get('/jscad_diagram').then((res, err) => {
    if (err) {
        console.log("Error fetching the diagram");
        console.log(err);
    } else {
        console.log("Received the diagram");
        viewer(document.getElementById('jscad'), res.body, true, true);
    }
})

document.body.appendChild(component());