import React from "react";
import ReactDOM from "react-dom";

import _ from 'lodash';
import './style.css';
import '../public/css/split.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import viewer from '../cjs/viewer'
import superagent from 'superagent'
import Split from 'react-split'

import MonacoEditor from "react-monaco-editor";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'


class NavbarComponent extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/webpack">
                        <img
                            src="/public/img/logo.svg"
                            width="30"
                            height="30"
                        />
                        HapD3cation
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Button variant="outline-success">
                                <FontAwesomeIcon icon={faPlay} />
                            </Button>
                            <NavDropdown title="Examples" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#barchart">Barchart</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

class EditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            code: '// type your code...',
        }
    }
    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        this.editorx = editor;
        editor.focus();
        //editor.layout();
    }
    onChange(newValue, e) {
        //console.log('onChange', newValue, e);
    }
    render() {
        const code = this.state.code;
        const options = {
            language: "javascript",
            minimap: {
                enabled: false
            },
            automaticLayout: true,
        };
        return (
            <MonacoEditor
                language="javascript"
                theme="vs"
                value={this.props.code}
                options={options}
                onChange={this.props.onChange}
                editorDidMount={this.editorDidMount}
            />
        );
    }
}

class DataComponent extends React.Component {
    render() {
        return (
            <div>
                {this.props.specification}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specification: 'Test',
        }
    }

    onChange = (newValue, e) => {
        // console.log('onChange', newValue, e);
        this.setState({
            specification: newValue,
        })
    }

    handleCodeUpdate() {

    }

    render() {
        return (
            <div className="full-height">
                <NavbarComponent />
                <Split
                    className="split"
                >
                    <div
                        className="full-height"
                    >
                        <EditorComponent code={this.state.specification} onChange={this.onChange}/>
                    </div>
                    <div
                        className="full-height"
                    >
                        <Split
                            className="full-height"
                            direction="vertical"
                        >
                            <div id="jscad">
                            </div>
                            <div>
                                <DataComponent specification={this.state.specification}/>
                            </div>
                        </Split>
                    </div>
                </Split>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('react-container')
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