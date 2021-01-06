import React, { Component } from 'react';
import axios from 'axios';
import { TitleItems } from './title_Items';
const port = 4000;

export class DisplayTitles extends Component {
    constructor() {
        super();
        this.state = { titles: [ ] }
        this.ReloadTitleDisplay = this.ReloadTitleDisplay.bind(this);
    }

    // function which retrieves data and sets the titles collection
    componentDidMount() {
        axios.get(`http://localhost:${port}/api/titles`) // Retrieves the data from our server
        .then(response => {
            this.setState({titles:response.data}); // sets titles collection with the data retrieved
        })
        .catch((error)=> {
            console.log(error);
        });
    }

    // Reload data when a deletion occurs
    ReloadTitleDisplay() {
        axios.get(`http://localhost:${port}/api/titles`)
        .then(response => {
            this.setState({titles:response.data});
        })
        .catch((error)=> {
            console.log(error);
        });
    }
    
    render() {
        return(
            <div className="DisplayTitles">
                <h1>Browse Titles</h1>
                {/* Embedded TitleItems Component (displays all titles)*/}
                <TitleItems titles={this.state.titles} ReloadTitleDisplay={this.ReloadTitleDisplay}></TitleItems> 
            </div>
        );
    }
}