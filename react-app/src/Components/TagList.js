import React, {Component} from 'react';
import Modal from './Modal.js';

class TagList extends Component {
    state = {
        show: false
    };

    onClick = e => {
        this.setState({show: !this.state.show})
    }
    render() {
        if (this.state.show) {
            return <div>
                <div onClick={this.onClick}>{this.props.tag.name}</div><br/>
                <Modal/>
            </div>
        } else {
            return <div>
                <div onClick={this.onClick}>{this.props.tag.name}</div><br/>
            </div>
        };
    };
};

export default TagList;