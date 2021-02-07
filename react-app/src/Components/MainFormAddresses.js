import React, {Component} from 'react';
import Addresses from './MainForm/Addresses.js';

class MainFormAddresses extends Component {
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
                <button onClick={this.closeModal}>addresses</button>
                <Addresses addresses={this.props.addresses}
                            closeModal={this.closeModal}
                            openModal={this.openModal}
                            adding={this.props.adding}/>
            </div>
        } else {
            return <div>
                <button onClick={this.openModal}>addresses</button>
            </div>
        };

    }
};

export default MainFormAddresses;