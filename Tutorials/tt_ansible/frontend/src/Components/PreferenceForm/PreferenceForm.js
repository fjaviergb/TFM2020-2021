import React, {Component} from 'react';
import TagList from './List/TagList.js';
import AddressList from './List/AddressList.js';
import PublicKey from './List/PublicKey.js';
import Service from '../../services/service.js';

class PreferenceForm extends Component{
    state = {
        newAddress: '',
        newTag: '',
        newPublicKey: '',
    }

    toTheTop = () => {
        window.scrollTo(0, 0)
      }

    onSubmit = e => {
        e.preventDefault();
        if (e.target.name === 'newAddress') {
            Service.newAddress({
                name:this.state.newAddress,
            })
            .then(res => {
                Service.changeAddress({
                    alias:this.state.newAddress,
                    idcl:this.props.token.idcl,
                    idad: res.data.idad,
                })
                .then(_res => {this.props.newAddress({idad: _res.data.idad,
                                                            alias: _res.data.alias,
                                                            idname:_res.data.idname,
                                                            name:this.state.newAddress})})
                .catch(err => {console.log(err.response.data.message)})
            })
            .catch(err => console.log(err.response.data.message))
        } else if (e.target.name === 'newTag') {
            Service.newTag({
                name:this.state.newTag,
            })
            .then(res => {
                Service.changeTag({
                    alias:this.state.newTag,
                    idcl:this.props.token.idcl,
                    idta: res.data.idta,
                })
                .then(_res => {this.props.newTag({idta: _res.data.idta,
                                                      alias: _res.data.alias,
                                                      idname:_res.data.idname,
                                                      name:this.state.newTag})})
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
                    <h2>ADDRESSES</h2>
                    <div className="new">
                        <form onSubmit={this.onSubmit} name="newAddress">
                            <input type='text'
                                placeholder='New address'
                                onChange={this.onChanges}
                                name="newAddress">
                            </input>
                            <button type='submit' className="submitnew">Add</button>
                        </form>
                    </div>
                    <div className="list">
                        <h3>Currently</h3>
                        {this.props.addresses.map(el => {
                            return <AddressList key={el.idad}
                                        address={el}
                                        changeAddresses={this.props.changeAddresses}
                                        token={this.props.token}
                                        deleteAddress={this.props.deleteAddress}
                                        publicKeys={this.props.publicKeys}/>
                        })}
                    </div>
                </div>

                <div className="param">
                    <h2>TAGS</h2>
                    <div className="new">
                        <form onSubmit={this.onSubmit} name="newTag">
                            <input type='text'
                                placeholder='New tag'
                                onChange={this.onChanges}
                                name="newTag">
                            </input>
                            <button type='submit' className="submitnew">Add</button>
                        </form>
                    </div>
                    <div className="list">
                        <h3>Currently</h3>
                        {this.props.tags.map(el => {
                            return <TagList key={el.idta}
                                    tag={el}
                                    changeTags={this.props.changeTags}
                                    token={this.props.token}
                                    deleteTag={this.props.deleteTag}
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