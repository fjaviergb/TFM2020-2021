import React, {Component} from 'react';

class Idents extends Component {
    state = {
        value: '',
    }
    onChange = (e) => {
        this.setState({
            value: JSON.parse(e.target.value).alias,
            idid: JSON.parse(e.target.value).idid
        })
    };

    texting = (e) => {
        this.props.adding({
            forText: this.state.value,
            forQuery: `idid=${this.state.idid}`
        })
    }
    render() {
        return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
            <div className="modal" id="modal">
                <button id="closemodal" onClick={this.props.closeModal}>
                        X
                    </button>
                <div className="content" id="results">
                        <select name="select"
                                size='10'
                                onChange={this.onChange}>
                            {this.props.ident.map(el => {
                                return <option key={el.alias+el.idid}
                                value={JSON.stringify({
                                    alias:el.alias,
                                    idid:el.idid
                                })}>{el.alias}</option>
                            })}
                        </select>
                </div>
                <div className="actions">
                    <button id="accept" onClick={this.texting}>add</button>
                </div>
            </div>
        </div>
    }
};

export default Idents;