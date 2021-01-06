import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './home';
import { AddTitle } from './addTitle';
import { DisplayTitles } from './displayTitles';
import { EditTitle } from './editTitle';

// Component that enables navigation around the application
export class Navigation extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="NavigationBar">
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/">What to Watch</Navbar.Brand>
                        <Nav className="NavLinks">
                            <Nav.Link href="/">Home</Nav.Link>                            
                            <Nav.Link href="/displayTitles">All Titles</Nav.Link>
                            <Nav.Link href="/addTitle">Add Title</Nav.Link>
                        </Nav>
                    </Navbar>
                    <Switch>
                        <Route path='/' component={Home} exact></Route>
                        <Route path='/addTitle' component={AddTitle} exact></Route>
                        <Route path='/displayTitles' component={DisplayTitles} exact></Route>
                        <Route path='/edit/:id' component={EditTitle} exact></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}