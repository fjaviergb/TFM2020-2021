import React,{Component} from 'react';
import '../../../modal.css';
import Service from '../../../services/service.js'
import ModalKeyBox from './ModalKeyBoxTag.js';

class Modal extends Component {
    state = {
        alias: `${this.props.object.alias}`,
    };


    onSubmit = (e) => {
        e.preventDefault()
        Service.changeTag({
            idname: this.props.object.idname,
            alias: this.state.alias,
            idcl:this.props.token.idcl,
            idta: this.props.object.idta,
        })
        .then(res => {this.props.changeTags({idta: res.data.idta,
                                            alias: res.data.alias})})
        .catch(err => {console.log(err.data)})
    };

    onChange = (e) => {
        this.setState({alias:e.target.value})
    };

    onDelete = (e) => {
        Service.removeTagRelations({idta: this.props.object.idta, idcl:this.props.token.idcl})
        .then(res => {'Tag removed successfully'})
        .catch(err => console.log(err))
        Service.deleteTag({idname: this.props.object.idname})
        .then(res => {
            this.props.deleteTag(this.props.object.idname)
        })
        .catch(err => console.log(err));
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
                         <div className="frontcont"><b>Tag:</b> {this.props.object.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.object.idta}</div>
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
                        return <ModalKeyBox key={elem.alias}
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