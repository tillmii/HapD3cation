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
import Table from 'react-bootstrap/Table'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { CsvToHtmlTable } from 'react-csv-to-table';


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
                        <Nav className="ms-auto" >
                            <NavDropdown title="Examples" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#barchart">Barchart</NavDropdown.Item>
                            </NavDropdown>
                            <Button variant="outline-success">
                                <FontAwesomeIcon icon={faPlay} />
                            </Button>
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
            language: "json",
            minimap: {
                enabled: false
            },
            automaticLayout: true,
            wordWrap: "on",
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
            <div className="scrollable">
                    <CsvToHtmlTable
                        data={JSON.parse(this.props.specification).data.values}
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
            specification: '{\n'+
                '    "description": "Das folgende Diagramm enthält alle Impfungen bis zum einschließlich 07. Juli 2021 aus 8 verschiedenen Bundesländern. Die Säulen in der hinteren Reihe (1) enthalten die Zahlen aller mindestens einmal geimpften Personen. Die Säulen in der vorderen Reihe (2) enthalten die Zahlen aller vollständig geimpften Personen. Die Höhe jeder Säule repräsentiert die Anzahl der Menschen, die geimpft wurden. Weiterhin ist jede Säule in 2 Abschnitte unterteilt: Der untere Abschnitt ist weniger rau und repräsentiert alle geimpften Personen unter 60 Jahren, der ober Abschnitt ist stärker angeraut und repräsentiert alle geimpften Personen, welche 60 Jahre oder älter sind. Die Bundesländer treten von links nach rechts in folgender Reihenfolge auf: Berlin (BE), Brandenburg (BB), Hessen (HE), Rheinland-Pfalz (RP), Sachsen (SN), Sachsen-Anhalt (ST), Schleswig-Holstein (SH), Thüringen (TH). An den Seiten jeder Säule befinden sich Markierungen. Diese haben jeweils einen Abstand von einem Zentimeter. Jeder Abschnitt repräsentiert ca. 350000 Personen.",\n'+
                '    "data": {\n'+
                '        "values": "Bundesland,Alter,Anzahl,Impfstatus\\nBE,bis_59,1249009,E\\nBB,bis_59,646375,E\\nHE,bis_59,2014537,E\\nRP,bis_59,1279323,E\\nSN,bis_59,952460,E\\nST,bis_59,534312,E\\nSH,bis_59,973072,E\\nTH,bis_59,539266,E\\nBE,ab_60,770509,E\\nBB,ab_60,636215,E\\nHE,ab_60,1436865,E\\nRP,ab_60,1032644,E\\nSN,ab_60,992991,E\\nST,ab_60,600911,E\\nSH,ab_60,753526,E\\nTH,ab_60,563912,E\\nBE,bis_59,772856,V\\nBB,bis_59,414875,V\\nHE,bis_59,1386409,V\\nRP,bis_59,822881,V\\nSN,bis_59,719440,V\\nST,bis_59,356159,V\\nSH,bis_59,614200,V\\nTH,bis_59,365282,V\\nBE,ab_60,674991,V\\nBB,ab_60,518952,V\\nHE,ab_60,1095244,V\\nRP,ab_60,805295,V\\nSN,ab_60,849376,V\\nST,ab_60,504089,V\\nSH,ab_60,615654,V\\nTH,ab_60,460187,V\\n",\n'+
                '        "format": {\n'+
                '            "type": "csv"\n'+
                '        }\n'+
                '    },\n'+
                '    "mark": "bar",\n'+
                '    "encoding": {\n'+
                '        "x": {"field": "Bundesland", "type": "nominal"},\n'+
                '        "y": {"field": "Impfstatus", "type": "nominal"},\n'+
                '        "z": {"field": "Anzahl", "type": "quantitative"},\n'+
                '        "roughness": {"field": "Alter", "type": "ordinal"}\n'+
                '    }\n'+
                '}'
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
                    className="split full-height-minus-navbar"
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