import React, {Component} from 'react';
import MainFormAddresses from './List/MainFormAddresses.js';
import MainFormTags from './List/MainFormTags.js';
import Service from '../../services/service.js';
import Results from './List/Results.js'
import TRYTES from '../../services/trytes.js';
import NodeRSA  from 'node-rsa';

class MainForm extends Component{
    state = {
        forText: ``,
        results: [],
        resultsTemp: []
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
    toTheTop = () => {
        window.scrollTo(0, 0)
      }
    queryAll = (e) => {
        this.setState({results: []})
        this.setState({resultsTemp: []})
        e.preventDefault()
        Service.queryAll({
            query: this.state.forText,
            idcl: this.props.token.idcl
        })
        .then(res => {
            this.setState({resultsTemp: res.data.result}, () =>
            this.state.resultsTemp.forEach((el) => {
                var trytes = TRYTES.TRYTESTOASCII(el.trytes.slice(0,2187))
                Service.queryPkeys({idta: el.idta, idad: el.idad, idcl:this.props.token.idcl})
                .then(_res => {
                    if (_res.data.result.length > 0) {
                        _res.data.result.forEach(pkey => {
                            let key = this.props.publicKeys.filter(elem => elem.idke === pkey.idke)
                            if (key.length > 0) {
                                let key_public = new NodeRSA(key[0].name)
                                try {
                                    var decryptedData = key_public.decryptPublic(trytes, 'utf8')
                                } catch (err) {decryptedData = ''}
                                if(decryptedData) {el.message = decryptedData;}
                            }
                        })
                        if (el.message) {
                            this.setState({results: [...this.state.results,el]})
                        }
                    } else {
                        el.message = trytes;
                        if (el.message) {
                            this.setState({results: [...this.state.results,el]})
                        }
                    }
                })
                .catch(err => console.log(err.response.data.message))
            }))
        })
        .catch(err => console.log(err.response))
    };

    render() {
        return <div id="main">
            <div className="header">
                <button onClick={this.props.swapMain}
                        name={"main"}
                        className="selected">MAIN</button>
                <button onClick={this.props.swapMain}
                        name={"preference"}
                        >PREFERENCES</button>
                <button onClick={this.props.removeToken}
                        id="logout">LogOut</button>                        
            </div>
            
            <div className="body">
                <div className="param">
                    <h2>QUERY</h2> 
                    <div className="form">
                        <textarea 
                            placeholder="Write your query here"
                            onChange={this.onChange}
                            value={this.state.forText}
                            name="query">
                        </textarea>
                        <div className="add">
                            <div className="elems">
                                <MainFormAddresses addresses={this.props.addresses}
                                                    adding={this.adding}/>
                                <MainFormTags tags={this.props.tags}
                                                    adding={this.adding}/>
                            </div>
                            <button onClick={this.queryAll}
                                    id="search">search</button>
                        </div>
                    </div>
                </div> 
                <div className="list">
                    <h2>RESULTS</h2>
                    {this.state.results.map((el) => {
                        return <Results key={el.name} result={el}/>
                    })}
                </div>
                <button onClick={this.toTheTop}
                            id="totop">Top</button> 
            </div>
        </div>
    };
};
export default MainForm;