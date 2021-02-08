import React, {Component} from 'react';

class Addresses extends Component {
    state = {
        value: '',
    }
    onChange = (e) => {
        this.setState({
            value: JSON.parse(e.target.value).alias,
            idad: JSON.parse(e.target.value).idad
        })
    };

    texting = (e) => {
        this.props.adding({
            forText: this.state.value,
            forQuery: `idad=${this.state.idad}`
        })
    }
    render() {
        return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
            <div className="modal" id="modal">
                <div className="content">
                        <select name="select" size={this.props.addresses.length} onClick={this.onChange} onChange={this.onChange}>
                            {this.props.addresses.map(el => {
                                return <option key={el.alias}
                                value={JSON.stringify({
                                    alias:el.alias,
                                    idad:el.idad
                                })}>{el.alias}</option>
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