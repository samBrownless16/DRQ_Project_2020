import React, { Component } from 'react';
import { InfoForm } from './titleInfoForm';

export class AddTitle extends Component {
    render() {
        return (
            <div className="AddTitle">
                {/* Pass 'edit' so the component can render the form in the correct manner */}
                <InfoForm edit={false}></InfoForm>
            </div>
        )
    }
}