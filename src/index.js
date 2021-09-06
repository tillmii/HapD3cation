import React from "react";
import ReactDOM from "react-dom";

import _ from 'lodash';
import './style.css';
import '../public/css/split.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import viewer from './viewer'
import superagent from 'superagent'
import Split from 'react-split'

import MonacoEditor from "react-monaco-editor";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import Table from 'react-bootstrap/Table'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {faDownload} from '@fortawesome/free-solid-svg-icons';

import {CsvToHtmlTable} from 'react-csv-to-table';

import { exampleSpecification } from '../ExampleSpecification';


class NavbarComponent extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/webpack">
                        <img
                            src="/public/img/logo.svg"
                            alt="Logo of HapD3cation"
                            width="30"
                            height="30"
                        />
                        HapD3cation
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown title="Examples" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#barchart">Barchart</NavDropdown.Item>
                            </NavDropdown>
                            <DownloadButton
                                enableDownload={this.props.enableDownload}
                                preparingDownload={this.props.preparingDownload}
                                handleClickDownloadButton={this.props.handleClickDownloadButton}
                            />
                            <LoadingButton
                                enableRenderButton={this.props.enableRenderButton}
                                viewerIsLoading={this.props.viewerIsLoading}
                                handleClickRenderButton={this.props.handleClickRenderButton}
                            />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

class LoadingButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Button
                className={'mx-1'}
                variant="outline-success"
                disabled={!this.props.enableRenderButton || this.props.viewerIsLoading}
                onClick={!this.props.viewerIsLoading ? this.props.handleClickRenderButton : null}
            >
                {this.props.viewerIsLoading ? 'Loading…' : <FontAwesomeIcon icon={faPlay}/>}
            </Button>
        );
    }
}

class DownloadButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Button
                className={'mx-1'}
                variant="outline-primary"
                disabled={!this.props.enableDownload || this.props.preparingDownload}
                onClick={!this.props.preparingDownload ? this.props.handleClickDownloadButton : null}
            >
                {this.props.preparingDownload ? 'Preparing Download…' : <FontAwesomeIcon icon={faDownload}/>}
            </Button>
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

    editorWillMount(monaco) {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            enableSchemaRequest: true,
            // schemas: [{
            //     uri: "https://hapd3cation.tillmii.de/public/hapd3cationSchema.json",
            //     fileMatch: ['*'],
            // }]
        });
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
        const options = {
            language: "json",
            minimap: {
                enabled: false
            },
            automaticLayout: true,
            wordWrap: "on",
            // setDiagnosticsOptions: {
            //     validate: true,
            //     allowComments: false,
            //     schemas: [],
            //     enableSchemaRequest: true
            // }
        };
        return (
            <MonacoEditor
                language="javascript"
                theme="vs"
                value={this.props.code}
                options={options}
                onChange={this.props.onChange}
                editorDidMount={this.editorDidMount}
                editorWillMount={this.editorWillMount}
            />
        );
    }
}

class DataComponent extends React.Component {
    render() {
        let data = "";
        try {
            data = JSON.parse(this.props.specification).data.values;
        } catch (e) {
            console.log("Error parsing the data")
        }
        return (
            <div className="scrollable">
                <CsvToHtmlTable
                    data={data}
                    csvDelimiter=","
                    tableClassName="table table-striped table-bordered table-hover"
                />
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderedDiagram: null,
            enableRenderButton: true,
            viewerIsLoading: false,
            enableDownload: false,
            preparingDownload: false,
            specification: JSON.stringify(exampleSpecification, null, 4),
        }
        this.handleClickRenderButton = this.handleClickRenderButton.bind(this);
    }

    onChange = (newValue, e) => {
        this.setState({
            specification: newValue,
        })
    }

    handleClickRenderButton = () => {
        this.setState({
            enableDownload: false,
            viewerIsLoading: true,
        })
        // console.log(this.state.specification);
        superagent
            .post('/jscad_diagram')
            .set('Content-Type', 'application/json')
            .send(JSON.parse(this.state.specification))
            .then((res, err) => {
                this.setState({
                    viewerIsLoading: false,
                })
                if (err) {
                    console.log("Error fetching the diagram");
                    console.log(err);
                } else {
                    this.setState({
                        renderedDiagram: res.body,
                        enableDownload: true,
                    })
                    console.log("Received the diagram");
                    viewer.viewer(document.getElementById('jscad'), res.body, true, true);
                }
            })
    }

    handleClickDownloadButton = () => {
        this.setState({
            preparingDownload: true,
            enableRenderButton: false,
        })
        superagent
            .post('download')
            .set('Content-Type', 'application/json')
            .send(this.state.renderedDiagram)
            .then((res, err) => {
                this.setState({
                    preparingDownload: false,
                    enableRenderButton: true,
                })
                if (err) {
                    console.log("Error preparing the download");
                    console.log(err);
                } else {
                    this.setState({
                        // renderedDiagram: res.body,
                        // enableDownload: true,
                    })
                    console.log("Successfully prepared the download");
                    let hapd3cationId = this.state.renderedDiagram[0].id;
                    let downloadPath = '/download/' + hapd3cationId;
                    window.open(downloadPath);
                }
            })
    }

    updateViewer = () => {
        viewer.setUpdateView();
    }

    render() {
        return (
            <div className="full-height">
                <NavbarComponent
                    enableRenderButton={this.state.enableRenderButton}
                    viewerIsLoading={this.state.viewerIsLoading}
                    handleClickRenderButton={this.handleClickRenderButton}
                    enableDownload={this.state.enableDownload}
                    preparingDownload={this.state.preparingDownload}
                    handleClickDownloadButton={this.handleClickDownloadButton}
                />
                <Split
                    className="split full-height-minus-navbar"
                    onDragStart={this.updateViewer}
                    onDrag={this.updateViewer}
                    onDragEnd={this.updateViewer}
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
                            onDragStart={this.updateViewer}
                            onDrag={this.updateViewer}
                            onDragEnd={this.updateViewer}
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
    <Game/>,
    document.getElementById('react-container')
);

// superagent.get('/jscad_diagram').then((res, err) => {
//     if (err) {
//         console.log("Error fetching the diagram");
//         console.log(err);
//     } else {
//         console.log("Received the diagram");
//         viewer(document.getElementById('jscad'), res.body, true, true);
//     }
// })