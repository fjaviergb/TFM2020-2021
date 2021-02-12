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
        .catch(err => {console.log(err.data)})
    };

    onChange = (e) => {
        this.setState({alias:e.target.value})
    };

    onDelete = (e) => {
        Service.removePkeyRelationsTags({idke: this.props.object.idke, idcl: this.props.token.idcl})
        .then(res => {console.log('Successfully deleted from tags')})
        .catch(err => console.log(err))
        Service.removePkeyRelationsAdds({idke: this.props.object.idke, idcl: this.props.token.idcl})
        .then(res => {console.log('Successfully deleted from addresses')})
        .catch(err => console.log(err))
        Service.deletePublicKey({idname: this.props.object.idname})
        .then(res => {
            this.props.deletePublicKey(this.props.object.idname)
        })
        .catch(err => console.log(err));
    };

    render() {
        return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
            <div className="modal" id="modal">
                <form className="head" onSubmit={this.onSubmit}>
                    <input type="text" onChange={this.onChange} placeholder={this.props.object.alias}></input>
                    <button>X</button>
                </form>
                <div className="content">{this.props.object.name}</div>
                <div className="actions">
                    <button className="toggle-button" onClick={this.props.closeModal}>
                        close
                    </button>
                    <button className="toggle-button" onClick={this.onDelete}>
                        delete
                    </button>
                </div>
            </div>
        </div>
    }
};

export default Modal;