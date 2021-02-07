import React, {Component} from 'react';
import Modal from './ModalTag.js';

class TagList extends Component {
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
                <div onClick={this.closeModal}>{this.props.tag.name}</div>
                <Modal object={this.props.tag}
                       closeModal={this.closeModal}
                       changeTags={this.props.changeTags}
                       token={this.props.token}
                       deleteTag={this.props.deleteTag}
                       publicKeys={this.props.publicKeys}/>
            </div>
        } else {
            return <div>
                <div onClick={this.openModal}>{this.props.tag.name}</div>
            </div>
        };
    };
};

export default TagList;