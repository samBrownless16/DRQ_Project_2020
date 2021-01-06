import './stylesheets/style.css'
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
const functions = require('./functionality/functions')
const port = 4000;

export class Item extends Component {
    constructor() {
        super();
        this.DeleteTitle = this.DeleteTitle.bind(this);
    }

    // Make the delete request and then reload the page so deleted item is removed
    DeleteTitle(del) {
        del.preventDefault();
        axios.delete(`http://localhost:${port}/api/titles/` + this.props.title._id)
            .then(() => {
                this.props.ReloadTitleDisplay();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="Item">
                <div className="container-fluid col-lg-10">
                    <Row>
                        <Col>
                            <Card bg="light">
                                <Card.Header>{this.props.title.title}</Card.Header>
                                <Card.Img id="card_image" src={this.props.title.imageUrl} alt="Title Image Appears Here" />
                                <Card.Body>                                  
                                    <Card.Title>
                                        {/* If 'None Selected' is the value do not display it */}
                                        {functions.checkTypeSelected(this.props.title.type)} {/* Displays type (Film/TV series) */}
                                        ({this.props.title.genre}) {/* Displays genre */}
                                    </Card.Title>
                                    <Card.Text>{this.props.title.synopsis}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <Link to={"/edit/" + this.props.title._id} className="btn btn-primary">Edit</Link> {/* Edit Button */}
                                        </Col>
                                        <Col>
                                            <Button variant="danger" onClick={this.DeleteTitle}>Delete</Button> {/* Delete Button */}
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col>
                            {/* If the actors array is empty then don't display the table  */}
                            {this.props.title.actors.length > 0 &&
                                <Table striped bordered responsive>
                                    <thead>
                                        <tr>
                                            <th>Actors in {this.props.title.title}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Loop through array and output every actor name to the table */}
                                        {Array.from({ length: this.props.title.actors.length }).map((_, index) => (
                                            <tr key={index.toString()}>
                                                <td>{this.props.title.actors[index]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            }
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}