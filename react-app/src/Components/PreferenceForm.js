import React, {Component} from 'react';

class PreferenceForm extends Component{
    render() {
        return <div>PREFERENCES
            <br/>
            <button onClick={this.props.swapMain} name={"profile"}>Profile</button>
            <br/>
            <button onClick={this.props.swapMain} name={"main"}>Main</button>
            <br/>
            <button onClick={this.props.swapMain} name={"preference"}>Preferences</button>              
        </div>
    };
};
export default PreferenceForm;