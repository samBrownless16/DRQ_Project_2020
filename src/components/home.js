import './stylesheets/style.css'
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

export class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="container-fluid col-lg-8">
                    <Row id="home_jumbo">
                        <Col>
                            <Jumbotron fluid>
                                <Container>
                                    <p>
                                        Not sure what to watch next? Have a scroll through the site hopefully you will stumble 
                                        across your next favourite TV series or movie!
                                    </p>
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image id="home_image" fluid src="https://images.idgesg.net/images/article/2020/01/amazon_netflix_hulu-100827339-large.3x2.jpg" alt="Image Appears Here"></Image>
                        </Col>
                    </Row>
                    <Row id="home_jumbo">
                        <Col>
                            <Jumbotron fluid>
                                <Container>
                                    <p>
                                        Don't see a film or television series you think is worth watching? Make sure you add to 
                                        the site so other people will find out about it!
                                    </p>
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}