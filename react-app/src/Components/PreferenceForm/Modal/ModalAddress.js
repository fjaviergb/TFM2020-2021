import React,{Component} from 'react';
import '../../../modal.css';
import Service from '../../../services/service.js'
import ModalKeyBox from './ModalKeyBoxAdd.js';

class Modal extends Component {
    state = {
        alias: `${this.props.object.alias}`,
    };


    onSubmit = (e) => {
        e.preventDefault()
        Service.changeAddress({
            idname: this.props.object.idname,
            alias: this.state.alias,
            idcl:this.props.token.idcl,
            idad: this.props.object.idad,
        })
        .then(res => {this.props.changeAddresses({idad: res.data.idad,
                                            alias: res.data.alias})})
        .catch(err => {console.log(err.response.data.message)})

    };

    onChange = (e) => {
        this.setState({alias:e.target.value})
    };

    onDelete = (e) => {
        Service.removeAddressRelations({idad: this.props.object.idad, idcl:this.props.token.idcl})
        .then(res => {'Address removed successfully'})
        .catch(err => console.log(err.response.data.message))
        Service.deleteAddress({idname: this.props.object.idname})
        .then(res => {
            this.props.deleteAddress(this.props.object.idname)
        })
        .catch(err => console.log(err.response.data.message));
    };

    render() {
        return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
            <div className="modal" id="modal">
                <button id="closemodal" onClick={this.props.closeModal}>
                        X
                    </button>
                <div className="head">
                        <div className="fronttitle"><b>ALIAS:</b> {this.props.object.alias}</div>
                         <div className="frontcont"><b>Address:</b> {this.props.object.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.object.idad}</div>
                </div>                

                <div className="content">
                    <span>Named as  </span>
                    <form onSubmit={this.onSubmit}>
                        <input type="text"
                                onChange={this.onChange}
                                placeholder={this.props.object.alias}></input>
                        <button>✓</button>
                    </form>
                </div>

                <div className="contentkeys">
                    <div>Select its public keys of interest: </div>
                    {this.props.publicKeys.map(elem => {
                        return <ModalKeyBox key={elem.alias+elem.idke}
                                            publicKey={elem}
                                            object={this.props.object}
                                            token={this.props.token}/>
                    })}
                </div>
                <div className="actions">
                    <button className="toggle-button" onClick={this.onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    }
};

export default Modal;