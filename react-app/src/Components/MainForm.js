import React, {Component} from 'react';
import MainFormAddresses from './MainFormAddresses.js';
import MainFormTags from './MainFormTags.js';
import './modal.css';
import Service from '../services/service.js';
import Results from './MainForm/Results.js'
import TRYTES from '../services/trytes.js';

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
        e.preventDefault()
        Service.queryAll({
            query: this.state.forText,
            idcl: this.props.token.idcl
        })
        .then(res => {
            this.setState({results: res.data.result}, () =>
            this.state.results.forEach((el) => {
                Service.queryPkeys({idta: el.idta, idad: el.idad, idcl:this.props.token.idcl})
                .then(_res => {
                    _res.data.result.forEach(pkey => {
                        let key = this.props.publicKeys.filter(elem => elem.idke === pkey.idke)
                        el.message = [TRYTES.TRYTESTOASCII(el.trytes.slice(0,2187)), key[0].name]
                    })
                })
                .catch(err => console.log(err))
            }))
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