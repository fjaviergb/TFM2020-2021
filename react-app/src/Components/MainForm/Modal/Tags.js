import React, {Component} from 'react';

class Tags extends Component {
    state = {
        value: '',
    }
    onChange = (e) => {
        this.setState({
            value: JSON.parse(e.target.value).alias,
            idta: JSON.parse(e.target.value).idta
        })
    };

    texting = (e) => {
        this.props.adding({
            forText: this.state.value,
            forQuery: `idta=${this.state.idta}`
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
                                size={this.props.tags.length}
                                onChange={this.onChange}>
                            {this.props.tags.map(el => {
                                return <option key={el.alias+el.idta}
                                value={JSON.stringify({
                                    alias:el.alias,
                                    idta:el.idta
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

export default Tags;