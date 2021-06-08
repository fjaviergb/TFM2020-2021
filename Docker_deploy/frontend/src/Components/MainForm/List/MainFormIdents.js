import React, {Component} from 'react';
import Idents from '../Modal/Idents.js';

class MainFormIdents extends Component {
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
                        <button onClick={this.closeModal}>+ idents</button>
                    </div>
                    <Idents ident={this.props.ident}
                                closeModal={this.closeModal}
                                openModal={this.openModal}
                                adding={this.props.adding}/>
                </div>
        } else {
            return <div className="elem">
                    <div className="front">
                        <button onClick={this.openModal}>+ idents</button>
                    </div>
                </div>
        };

    }
};

export default MainFormIdents;