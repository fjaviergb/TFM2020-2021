import React, {Component} from 'react';
import Modal from '../Modal/ModalPublicKey.js';

class PublicKey extends Component {
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
                         <div className="fronttitle"><b>ALIAS:</b> {this.props.publicKey.alias}</div>
                         <div className="frontcont"><b>Name:</b> {this.props.publicKey.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.publicKey.idke}</div>
                </div>
                <Modal object={this.props.publicKey}
                       closeModal={this.closeModal}
                       changePublicKeys={this.props.changePublicKeys}
                       token={this.props.token}
                       deletePublicKey={this.props.deletePublicKey}/>
            </div>
        } else {
            return <div className="elem">
                <div onClick={this.openModal}
                     className="front">
                         <div className="fronttitle"><b>ALIAS:</b> {this.props.publicKey.alias}</div>
                         <div className="frontcont"><b>Name:</b> {this.props.publicKey.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.publicKey.idke}</div>
                </div>
            </div>
        };
    }
};

export default PublicKey;