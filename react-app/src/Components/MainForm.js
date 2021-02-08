import React, {Component} from 'react';
import MainFormAddresses from './MainFormAddresses.js';
import MainFormTags from './MainFormTags.js';
import './modal.css';
import Service from '../services/service.js';
import Results from './MainForm/Results.js'

class MainForm extends Component{
    state = {
        forText: ``,
        results: [],
    };
    onChange = (e) => {
        this.setState({
            forText: e.target.value,
        })

    };
    adding = (e) => {
        this.setState({
            forText: this.state.forText + `${e.forQuery}`,
        })   
    };
    queryAll = (e) => {
        console.log(this.state.forText)
        e.preventDefault()
        Service.queryAll({
            query: this.state.forText,
            idcl: this.props.token.idcl
        })
        .then(res => {
            this.setState({results: res.data.result})
        })
        .catch(err => console.log(err))
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
                <MainFormAddresses addresses={this.props.addresses}
                                    adding={this.adding}/>
                <MainFormTags tags={this.props.tags}
                                    adding={this.adding}/>
                <br/>
                <textarea 
                    className="entry"
                    placeholder="Write your query here"
                    onChange={this.onChange}
                    value={this.state.forText}
                    name="query">
                </textarea>
                <br/>
                <br/>
                <button onClick={this.queryAll}>search</button>

            <div><h2>Resultados:</h2>
                {this.state.results.map((el) => {
                    return <Results key={el.name} result={el}/>
                })}
            </div>
        </div>
    };
};
export default MainForm;