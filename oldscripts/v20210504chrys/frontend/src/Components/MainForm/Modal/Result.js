import React, {Component} from 'react';

const GetDate = (props) => {
    const {timestamp} = props;
    var date = `${new Date(timestamp * 1000)}`
    return (<div>{date}</div>)
};

class Result extends Component {
    state = {
        show: true,
    }

    swap = (e) => {
        if (e.target.name === "true") {
            this.setState({show: true})
        } else {this.setState({show: false})}
    }
    render() {
        if(this.state.show){
            return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
                <div className="modal" id="modal">
                    <button id="closemodal" onClick={this.props.closeModal}>
                            X
                        </button>
                    <div className="contentstruct">
                        <h3>{this.props.result.name}</h3>
                        <div><b>Message</b>: <br/>{this.props.result.message}</div><br/>
                        <div><b>Identifier</b>: <br/>{this.props.result.identifier}</div><br/>
                        <div><b>Date</b>: <br/><GetDate timestamp={this.props.result.timestamp}/></div><br/>
                    </div>
                    <div className="actions-results">
                        <div id="actions-results-con">
                            <button name="true" onClick={this.swap}>Structured</button>
                            <button name="false" onClick={this.swap}>Brute</button>
                        </div>
                    </div>
                </div>
            </div>
        } else {
            return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
                <div className="modal" id="modal">
                    <button id="closemodal" onClick={this.props.closeModal}>
                            X
                        </button>
                    <div className="contenttrytes">
                        {this.props.result.data}
                    </div>
                    <div className="actions-results">
                        <div id="actions-results-con">
                            <button name="true" onClick={this.swap}>Structured</button>
                            <button name="false" onClick={this.swap}>Brute</button>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
};

export default Result;