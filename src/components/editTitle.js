import React, { Component } from 'react';
import { InfoForm } from './titleInfoForm';

export class EditTitle extends Component {
    constructor(props) {
        super(props);
        this.state = { id: this.props.match.params.id }
    }

    render() {
        return (
            <div className="EditTitle">
                {/* Pass the id parameter down to component so we can retrieve the data from that document to populate 
                the fields, also pass 'edit' so the component can render the form in the correct manner */}
                <InfoForm id={this.state.id} edit={true}></InfoForm>
            </div>
        )
    }
}