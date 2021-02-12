import React, {Component} from 'react';
import Modal from '../Modal/ModalAddress.js';

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
            return <div className="elem">
                <div onClick={this.closeModal}
                     className="front">
                         <div className="fronttitle"><b>ALIAS:</b> {this.props.address.alias}</div>
                         <div className="frontcont"><b>Name:</b> {this.props.address.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.address.idad}</div>
                </div>
                <Modal object={this.props.address}
                       closeModal={this.closeModal}
                       changeAddresses={this.props.changeAddresses}
                       token={this.props.token}
                       deleteAddress={this.props.deleteAddress}
                       publicKeys={this.props.publicKeys}/>
            </div>
        } else {
            return <div className="elem">
                <div onClick={this.openModal}
                     className="front">
                         <div className="fronttitle"><b>ALIAS:</b> {this.props.address.alias}</div>
                         <div className="frontcont"><b>Name:</b> {this.props.address.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.address.idad}</div>
                </div>
            </div>
        };
    };
};

export default AddressList;