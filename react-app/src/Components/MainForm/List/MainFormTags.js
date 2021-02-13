import React, {Component} from 'react';
import Tags from '../Modal/Tags.js';

class MainFormTags extends Component {
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
                        <button onClick={this.closeModal}>+ tags</button>
                    </div>
                    <Tags tags={this.props.tags}
                                closeModal={this.closeModal}
                                openModal={this.openModal}
                                adding={this.props.adding}/>
                </div>
        } else {
            return <div className="elem">
                    <div className="front">
                        <button onClick={this.openModal}>+ tags</button>
                    </div>
                </div>
        };

    }
};

export default MainFormTags;