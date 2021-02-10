import React, {Component} from 'react';
import TagList from './TagList.js';
import AddressList from './AddressList.js';
import PublicKey from './PublicKey.js';
import Service from '../services/service.js';

class PreferenceForm extends Component{
    state = {
        newAddress: '',
        newTag: '',
        newPublicKey: '',
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
                .catch(err => {console.log(err.data)})
            })
            .catch(err => console.log(err))
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
                .catch(err => {console.log(err.data)})                
            })
            .catch(err => console.log(err))
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
                .catch(err => {console.log(err)})
            })
            .catch(err => console.log(err))
        };
    };

    onChanges = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {

        return <div className="preference">
            <div className="header">
                <button onClick={this.props.swapMain}
                        name={"main"}
                        className="btnNotSelected">Main</button>
                <button onClick={this.props.swapMain}
                        name={"preference"}
                        className="btnSelected">Preferences</button> 
            </div>
            <div className="body">
                <h3>ADDRESSES</h3>
                <form onSubmit={this.onSubmit} name="newAddress">
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
                                     token={this.props.token}
                                     deleteAddress={this.props.deleteAddress}
                                     publicKeys={this.props.publicKeys}/>
                    })}
                </div>
 
                <br/>
                <h3>TAGS</h3>
                <form onSubmit={this.onSubmit} name="newTag">
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
                                 token={this.props.token}
                                 deleteTag={this.props.deleteTag}
                                 publicKeys={this.props.publicKeys}/>
                    })}
                </div>

                <br/>
                <h3>PUBLIC KEYS</h3>
                <form onSubmit={this.onSubmit} name="newPublicKey">
                    <input type='text'
                        placeholder='New public key'
                        onChange={this.onChanges}
                        name="newPublicKey">
                    </input>
                    <button type='submit'>X</button>
                </form>
                <div><h3>Lista de public keys</h3>
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
    };
};
export default PreferenceForm;