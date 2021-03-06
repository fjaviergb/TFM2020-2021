import React,{Component} from 'react';
import '../../../modal.css';
import Service from '../../../services/service.js'

class Modal extends Component {
    state = {
        alias: `${this.props.object.alias}`,
    };


    onSubmit = (e) => {
        e.preventDefault()
        Service.changePublicKey({
            idname: this.props.object.idname,
            alias: this.state.alias,
            idcl:this.props.token.idcl,
            idke: this.props.object.idke,
        })
        .then(res => {this.props.changePublicKeys({idke: res.data.idke,
                                            alias: res.data.alias})})
        .catch(err => {console.log(err.response.data.message)})
    };

    onChange = (e) => {
        this.setState({alias:e.target.value})
    };

    onDelete = (e) => {
        Service.removePkeyRelationsTags({idke: this.props.object.idke, idcl: this.props.token.idcl})
        .then(res => {console.log('Successfully deleted from tags')})
        .catch(err => console.log(err.response.data.message))
        Service.removePkeyRelationsAdds({idke: this.props.object.idke, idcl: this.props.token.idcl})
        .then(res => {console.log('Successfully deleted from addresses')})
        .catch(err => console.log(err.response.data.message))
        Service.deletePublicKey({idname: this.props.object.idname})
        .then(res => {
            this.props.deletePublicKey(this.props.object.idname)
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
                         <div className="frontcont"><b>Public key:</b> {this.props.object.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.object.idke}</div>
                </div>

                <div className="content">
                    <span>Named as  </span>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" onChange={this.onChange} placeholder={this.props.object.alias}></input>
                        <button>✓</button>
                    </form>
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