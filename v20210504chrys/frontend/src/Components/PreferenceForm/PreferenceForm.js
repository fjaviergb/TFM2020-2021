import React, {Component} from 'react';
import IdentList from './List/IdentList.js';
import PublicKey from './List/PublicKey.js';
import Service from '../../services/service.js';

class PreferenceForm extends Component{
    state = {
        newIdent: '',
        newPublicKey: '',
    }

    toTheTop = () => {
        window.scrollTo(0, 0)
      }

    onSubmit = e => {
        e.preventDefault();
        if (e.target.name === 'newIdent') {
            Service.newIdent({
                name:this.state.newIdent,
            })
            .then(res => {
                Service.changeIdent({
                    alias:this.state.newIdent,
                    idcl:this.props.token.idcl,
                    idid: res.data.idid,
                })
                .then(_res => {this.props.newIdent({idid: _res.data.idid,
                                                      alias: _res.data.alias,
                                                      idname:_res.data.idname,
                                                      name:this.state.newIdent})})
                .catch(err => {console.log(err.response.data.message)})                
            })
            .catch(err => console.log(err.response.data.message))
        } else {
            Service.newPublicKey({
                name:this.state.newPublicKey,
            })
            .then(res => {
                Service.changePublicKey({
                    alias:this.state.newPublicKey,
                    idcl:this.props.token.idcl,
                    idke: res.data.idke,
                })
                .then(_res => {this.props.newPublicKey({idke: _res.data.idke,
                                                      alias: _res.data.alias,
                                                      name: this.state.newPublicKey,
                                                      idname: _res.data.idname})})
                .catch(err => {console.log(err.response.data.message)})
            })
            .catch(err => console.log(err.response.data.message))
        };
    };

    onChanges = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <div id="preference">
            <div className="header">
                <button onClick={this.props.swapMain}
                        name={"main"}
                       >MAIN</button>
                <button onClick={this.props.swapMain}
                        name={"preference"}
                        className="selected">PREFERENCES</button> 
                <button onClick={this.props.removeToken}
                        id="logout">LogOut</button>                        
            </div>
            <div className="body">

                <div className="param">
                    <h2>IDENTIFIERS</h2>
                    <div className="new">
                        <form onSubmit={this.onSubmit} name="newIdent">
                            <input type='text'
                                placeholder='New Identifier'
                                onChange={this.onChanges}
                                name="newIdent">
                            </input>
                            <button type='submit' className="submitnew">Add</button>
                        </form>
                    </div>
                    <div className="list">
                        <h3>Currently</h3>
                        {this.props.ident.map(el => {
                            return <IdentList key={el.idid}
                                    ident={el}
                                    changeIdent={this.props.changeIdent}
                                    token={this.props.token}
                                    deleteIdent={this.props.deleteIdent}
                                    publicKeys={this.props.publicKeys}/>
                        })}
                    </div>
                </div>

                <div className="param">
                    <h2>PUBLIC KEYS</h2>
                    <div className="new">
                        <form onSubmit={this.onSubmit} name="newPublicKey">
                            <input type='text'
                                placeholder='New public key'
                                onChange={this.onChanges}
                                name="newPublicKey">
                            </input>
                            <button type='submit' className="submitnew">Add</button>
                        </form>
                    </div>
                    <div className="list">
                        <h3>Currently</h3>
                        {this.props.publicKeys.map(el => {
                            return <PublicKey key={el.idke}
                                    publicKey={el}
                                    changePublicKeys={this.props.changePublicKeys}
                                    token={this.props.token}
                                    deletePublicKey={this.props.deletePublicKey}/>
                        })}
                    </div>
                </div>
            </div>       
            <button onClick={this.toTheTop}
                    id="totop">Top</button>                 
        </div>
    };
};
export default PreferenceForm;