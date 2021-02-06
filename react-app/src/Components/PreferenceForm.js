import React, {Component} from 'react';
import TagList from './TagList.js';
import AddressList from './AddressList.js';

class PreferenceForm extends Component{
    state = {
        newAddress: '',
        newTag: '',
        addressName: '',
        tagName: ''
    }

    onSubmit = e => {
        e.preventDefault();
    };

    onChanges = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {

        return <div>
            <br/>
            <button onClick={this.props.swapMain} name={"profile"}>Profile</button>
            <br/>
            <button onClick={this.props.swapMain} name={"main"}>Main</button>
            <br/>
            <button onClick={this.props.swapMain} name={"preference"}>Preferences</button> 
            <br/>
            <div>
                <h3>ADDRESSES</h3>
                <form onSubmit={this.onSubmit}>
                    <input type='text'
                        placeholder='New address'
                        onChange={this.onChanges}
                        name="newAddress">
                    </input>
                    <button type='submit'>X</button>
                </form>
                <div><h3>Lista de addresses</h3>
                    {this.props.addresses.map(el => {
                        return <AddressList key={el.idad}
                                     address={el}
                                     changeAddresses={this.props.changeAddresses}
                                     token={this.props.token}/>
                    })}
                </div>
 
                <br/>
                <h3>TAGS</h3>
                <form onSubmit={this.onSubmit}>
                    <input type='text'
                        placeholder='New tag'
                        onChange={this.onChanges}
                        name="newTag">
                    </input>
                    <button type='submit'>X</button>
                </form>
                <div><h3>Lista de tags</h3>
                    {this.props.tags.map(el => {
                        return <TagList key={el.idta}
                                 tag={el}
                                 changeTags={this.props.changeTags}
                                 token={this.props.token}/>
                    })}
                </div>

            </div>                        
        </div>
    };
};
export default PreferenceForm;