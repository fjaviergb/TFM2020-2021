import React, {Component} from 'react';
import Modal from './ModalPublicKey.js';

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
            return <div>
                <div onClick={this.closeModal}>{this.props.publicKey.name}</div>
                <Modal object={this.props.publicKey}
                       closeModal={this.closeModal}
                       changePublicKeys={this.props.changePublicKeys}
                       token={this.props.token}
                       deletePublicKey={this.props.deletePublicKey}/>
            </div>
        } else {
            return <div>
                <div onClick={this.openModal}>{this.props.publicKey.name}</div>
            </div>
        };
    }
};

export default PublicKey;