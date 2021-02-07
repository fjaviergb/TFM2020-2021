import React, {Component} from 'react';

class Addresses extends Component {
    state = {
        value: '',
    }
    onChange = (e) => {
        this.setState({value: e.target.value}, () => {
            console.log(this.state.value)
        })

    };

    texting = (e) => {
        this.props.adding(this.state.value)
    }
    render() {
        return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
            <div className="modal" id="modal">
                <div className="content">
                        <select name="select" onChange={this.onChange}>
                            {this.props.addresses.map(el => {
                                return <option key={el.alias}
                                value={el.alias}>{el.alias}</option>
                            })}
                        </select><br/>
                        <button onClick={this.texting}>add</button>
                </div>
                <div className="actions">
                    <button className="toggle-button" onClick={this.props.closeModal}>
                        close
                    </button>
                </div>
            </div>
        </div>
    }
};

export default Addresses;