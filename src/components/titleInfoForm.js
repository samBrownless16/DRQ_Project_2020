import './stylesheets/style.css'
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
//import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
//import Popover from 'react-bootstrap/Popover';
import axios from 'axios';
const port = 4000;
const functions = require('./functionality/functions')
const selectionGenre = ["No Genre Selected", "Action-Adventure", "Comedy", "Documentary", "Drama", "Horror", "Sci-Fi"];
const selectionTypes = ["None Selected", "Feature Film", "Film", "TV Series"];

/*const successActorAdded = (
    <Popover>
        <Popover.Title>Actor Added</Popover.Title>
    </Popover>
);//<OverlayTrigger trigger="focus" placement="top" overlay={successActorAdded}></OverlayTrigger>*/

export class InfoForm extends Component {
    constructor() {
        super();
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeSynopsis = this.onChangeSynopsis.bind(this);
        this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
        this.onChangeActorName = this.onChangeActorName.bind(this);
        this.onclickAddActor = this.onclickAddActor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            title: '',
            year: '',
            genre: selectionGenre[0],
            type: selectionTypes[0],
            synopsis: '',
            imageUrl: '',
            actorName: '',
            actors: []
        }
    }

    // Loads in values from the document selected to edit
    componentDidMount() {
        // only execute if editing an existing document
        if (this.props.edit) {
            axios.get(`http://localhost:${port}/api/titles/` + this.props.id)
                .then(response => {
                    this.setState({
                        _id: response.data._id,
                        title: response.data.title,
                        year: response.data.year,
                        genre: response.data.genre,
                        type: response.data.type,
                        synopsis: response.data.synopsis,
                        imageUrl: response.data.imageUrl,
                        actors: response.data.actors
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    //#region onChange Functions
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }

    onChangeGenre(e) {
        this.setState({
            genre: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    onChangeSynopsis(e) {
        this.setState({
            synopsis: e.target.value
        });
    }

    onChangeImageUrl(e) {
        this.setState({
            imageUrl: e.target.value
        });
    }

    onChangeActorName(e) {
        this.setState({
            actorName: e.target.value
        });
    }
    //#endregion

    //#region onSubmit Function
    onSubmit() {
        var newTitle = {
            _id: this.state._id,
            title: this.state.title,
            year: this.state.year,
            genre: this.state.genre,
            type: this.state.type,
            synopsis: functions.defaultSynopsisText(this.state.synopsis, this.state.title),
            imageUrl: functions.verifyImageLink(this.state.imageUrl),
            actors: this.state.actors
        }

        // Edited an existing document execute PUT request
        if (this.props.edit) {
            axios.put(`http://localhost:${port}/api/titles/` + this.state._id, newTitle)
                .then(response => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else { // New document execute POST request
            axios.post(`http://localhost:${port}/api/titles`, newTitle)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    //#endregion

    onclickAddActor() {
        this.state.actors.push(this.state.actorName);
        this.setState({ actorName: '' });
    }

    render() {
        return (
            <div className="InfoForm">
                <h1>{functions.pageHeaderText(this.props.edit, this.state.title)}</h1>
                <div className="container-fluid col-lg-8">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control as="input" value={this.state.title} onChange={this.onChangeTitle} placeholder="Enter Title" required disabled={this.props.edit} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control as="input" type="number" min="1900" max="2021" onChange={this.onChangeYear} value={this.state.year} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGenre">
                                <Form.Label>Genre</Form.Label>
                                <Form.Control as="select" onChange={this.onChangeGenre} value={this.state.genre}>
                                    {/* Loop through array to populate the available options for the selection input */}
                                    {Array.from({ length: selectionGenre.length }).map((_, index) => (
                                        <option key={index.toString()}>{selectionGenre[index]}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formType">
                                <Form.Label>Type</Form.Label>
                                <Form.Control as="select" onChange={this.onChangeType} value={this.state.type}>
                                    {/* Loop through array to populate the available options for the selection input */}
                                    {Array.from({ length: selectionTypes.length }).map((_, index) => (
                                        <option key={index.toString()}>{selectionTypes[index]}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formSynopsis">
                                <Form.Label>Add a Synopsis</Form.Label>
                                <Form.Control as="textarea" placeholder="Enter a Brief Synopsis..." onChange={this.onChangeSynopsis} value={this.state.synopsis} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formActors">
                                <Form.Label>Add an Actor</Form.Label>
                                <InputGroup>
                                    <Form.Control as="input" placeholder="Add Actors One at a Time" onChange={this.onChangeActorName} value={this.state.actorName} />
                                    <InputGroup.Append>
                                        <Button variant="secondary" onClick={this.onclickAddActor}>Click to Add</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                {/*<Form.Control.Feedback type='valid' style={{ fontSize: "12px", color: "green" }}>Actor Added! Feel Free to add another</Form.Control.Feedback>*/}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formImageUrl">
                                <Form.Label>Image to Display</Form.Label>
                                <Form.Control as="input" placeholder="Add Image URL" onChange={this.onChangeImageUrl} value={this.state.imageUrl} />
                            </Form.Group>
                        </Form.Row> 
                        <Button variant="success" type="submit">
                            {this.props.edit ? 'Save Changes' : 'Add Title'}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}