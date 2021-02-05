import React, {Component} from 'react';
import Modal from './Modal.js'
class AddressList extends Component {
    state = {
        show: false
    };

    onClick = e => {
        this.setState({show: !this.state.show})
    }
    render() {
        if (this.state.show) {
            return <div>
                <div onClick={this.onClick}>{this.props.address.name}</div><br/>
                <Modal/>
            </div>
        } else {
            return <div>
                <div onClick={this.onClick}>{this.props.address.name}</div><br/>
            </div>
        };
    }
};

export default AddressList;