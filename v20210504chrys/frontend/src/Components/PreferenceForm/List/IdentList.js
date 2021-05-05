import React, {Component} from 'react';
import Modal from '../Modal/ModalIdent.js';

class IdentList extends Component {
    state = {
        show: false
    };

    openModal = e => {
        this.setState({show: true})
    }
    closeModal = e => {
        this.setState({show: false})
    }

    render() {
        if (this.state.show) {
            return <div className="elem">
                <div onClick={this.closeModal}
                     className="front">
                         <div className="fronttitle"><b>ALIAS:</b> {this.props.ident.alias}</div>
                         <div className="frontcont"><b>Name:</b> {this.props.ident.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.ident.idid}</div>
                </div>
                <Modal object={this.props.ident}
                       closeModal={this.closeModal}
                       changeIdent={this.props.changeIdent}
                       token={this.props.token}
                       deleteIdent={this.props.deleteIdent}
                       publicKeys={this.props.publicKeys}/>
            </div>
        } else {
            return <div className="elem">
                <div onClick={this.openModal}
                     className="front">
                         <div className="fronttitle"><b>ALIAS:</b> {this.props.ident.alias}</div>
                         <div className="frontcont"><b>Name:</b> {this.props.ident.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.ident.idid}</div>
                </div>
            </div>
        };
    };
};

export default IdentList;