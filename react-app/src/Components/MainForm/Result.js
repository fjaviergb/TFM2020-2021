import React, {Component} from 'react';

class Addresses extends Component {
    state = {
        show: true,
    }

    swap = (e) => {
        this.setState({show: !this.state.show})
    }
    render() {
        if(this.state.show){
            return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
                <div className="modal" id="modal">
                    <div className="content">
                        {this.props.result.name}
                    </div>
                    <div className="actions">
                        <select name="select" size="2" onChange={this.swap}>
                            <option defaultValue>Estruturado</option>
                            <option>Trytes</option>
                        </select>

                        <button className="toggle-button" onClick={this.props.closeModal}>
                            close
                        </button>
                    </div>
                </div>
            </div>
        } else {
            return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
                <div className="modal" id="modal">
                    <div className="content">
                        {this.props.result.trytes}
                    </div>
                    <div className="actions">
                        <select name="select" size="2" onChange={this.swap}>
                            <option selected>Estruturado</option>
                            <option>Trytes</option>
                        </select>

                        <button className="toggle-button" onClick={this.props.closeModal}>
                            close
                        </button>
                    </div>
                </div>
            </div>
        }
    }
};

export default Addresses;