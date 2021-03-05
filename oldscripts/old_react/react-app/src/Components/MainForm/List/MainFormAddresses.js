import React, {Component} from 'react';
import Addresses from '../Modal/Addresses.js';

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
            return <div className="elem">
                    <div className="front">
                        <button onClick={this.closeModal}>+ addresses</button>
                    </div>
                    <Addresses addresses={this.props.addresses}
                                closeModal={this.closeModal}
                                openModal={this.openModal}
                                adding={this.props.adding}/>
                </div>
        } else {
            return <div className="elem">
                    <div className="front">
                        <button onClick={this.openModal}>+ addresses</button>
                    </div>
                </div>
        };

    }
};

export default MainFormAddresses;