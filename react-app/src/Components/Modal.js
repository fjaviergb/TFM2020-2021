import React,{Component} from 'react';
import './modal.css';

class Modal extends Component {
    render() {
        return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
            <div className="modal" id="modal">
                <h2>Modal Window</h2>
                <div className="content">{this.props.object.name}</div>
                <div className="actions">
                    <button className="toggle-button" onClick={this.props.closeModal}>
                        close
                    </button>
                </div>
            </div>
        </div>
    }
};

export default Modal;