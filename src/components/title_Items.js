import React, { Component } from 'react';
import { Item } from './individual_Title_Item';

export class TitleItems extends Component {
    render() {
        return this.props.titles.map((title) => {
            return <Item title={title} key={title._id} ReloadTitleDisplay={this.props.ReloadTitleDisplay}></Item>            
        })
    }
}