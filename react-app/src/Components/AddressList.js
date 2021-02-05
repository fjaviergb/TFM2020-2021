import React, {Component} from 'react';
import Modal from './Modal.js'
class AddressList extends Component {
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
                <div onClick={this.closeModal}>{this.props.address.name}</div>
                <Modal object={this.props.address} closeModal={this.closeModal}/>
            </div>
        } else {
            return <div>
                <div onClick={this.openModal}>{this.props.address.name}</div>
            </div>
        };
    };
};

export default AddressList;