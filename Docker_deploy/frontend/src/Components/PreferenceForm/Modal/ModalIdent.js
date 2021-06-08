import React,{Component} from 'react';
import '../../../modal.css';
import Service from '../../../services/service.js'
import ModalKeyBox from './ModalKeyBoxIdent.js';

class Modal extends Component {
    state = {
        alias: `${this.props.object.alias}`,
    };

    onSubmit = (e) => {
        e.preventDefault()
        Service.changeIdent({
            idname: this.props.object.idname,
            alias: this.state.alias,
            idcl:this.props.token.idcl,
            idid: this.props.object.idid,
        })
        .then(res => {this.props.changeIdent({idid: res.data.idid,
                                            alias: res.data.alias})})
        .catch(err => {console.log(err.response.data.message)})
    };

    onChange = (e) => {
        this.setState({alias:e.target.value})
    };

    onDelete = (e) => {
        Service.removeIdentRelations({idid: this.props.object.idid, idcl:this.props.token.idcl})
        .then(res => {'Identifier removed successfully'})
        .catch(err => console.log(err.response.data.message))
        Service.deleteIdent({idname: this.props.object.idname})
        .then(res => {
            this.props.deleteIdent(this.props.object.idname)
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
                         <div className="frontcont"><b>Ident:</b> {this.props.object.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.object.idid}</div>
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