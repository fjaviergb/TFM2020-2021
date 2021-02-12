import React, {Component} from 'react';
import Modal from '../Modal/ModalTag.js';

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
            return <div className="elem">
                <div onClick={this.closeModal}
                     className="front">
                         <div className="fronttitle"><b>ALIAS:</b> {this.props.tag.alias}</div>
                         <div className="frontcont"><b>Name:</b> {this.props.tag.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.tag.idta}</div>
                </div>
                <Modal object={this.props.tag}
                       closeModal={this.closeModal}
                       changeTags={this.props.changeTags}
                       token={this.props.token}
                       deleteTag={this.props.deleteTag}
                       publicKeys={this.props.publicKeys}/>
            </div>
        } else {
            return <div className="elem">
                <div onClick={this.openModal}
                     className="front">
                         <div className="fronttitle"><b>ALIAS:</b> {this.props.tag.alias}</div>
                         <div className="frontcont"><b>Name:</b> {this.props.tag.name}</div>
                         <div className="frontcont"><b>ID:</b> {this.props.tag.idta}</div>
                </div>
            </div>
        };
    };
};

export default TagList;