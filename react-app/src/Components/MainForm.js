import React, {Component} from 'react';
import MainFormAddresses from './MainFormAddresses.js';
import MainFormTags from './MainFormTags.js';
import './modal.css';

class MainForm extends Component{
    state = {
        query: '',
        results: []
    };
    onChange = (e) => {
        this.setState({query: e.target.value})

    };
    adding = (e) => {
        this.setState({query: this.state.query + e})   
    }
    onSubmit = (e) => {
        e.preventDefault()
    };
    onSearch = (e) => {
        // SEARCH IN DB
    };

    render() {
        return <div><br/>
            <button onClick={this.props.swapMain} name={"profile"}>Profile</button>
            <br/>
            <button onClick={this.props.swapMain} name={"main"}>Main</button>
            <br/>
            <button onClick={this.props.swapMain} name={"preference"}>Preferences</button>     
            <br/><br/>
            <div><h2>QUERY:</h2></div>  
            <form onSubmit={this.onSubmit}>
                <MainFormAddresses addresses={this.props.addresses}
                                    adding={this.adding}/>
                <MainFormTags/>
                <br/>
                <input type="text" onChange={this.onChange} value={this.state.query} name="query"></input>
                <br/>
                <br/>
                <button type="submit" onClick={this.onSearch}>search</button>
            </form>

            <div><h2>Resultados:</h2>
                {/* {this.state.results.map(el => {
                    // MODAL DE CADA ELEMENTO
                })} */}
            </div>
        </div>
    };
};
export default MainForm;