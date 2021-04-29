import React, {Component} from 'react';

const GetDate = (props) => {
    const {timestamp} = props;
    var date = `${new Date(timestamp * 1000)}`
    return (<div>{date}</div>)
};

class Addresses extends Component {
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
                        <div>Message: <br/>{this.props.result.message}</div><br/>
                        <div>Address: <br/>{this.props.result.address}</div><br/>
                        <div>Tag: <br/>{this.props.result.tag}</div><br/>
                        <div>Date: <br/><GetDate timestamp={this.props.result.timestamp}/></div><br/>
  
                    </div>
                    <div className="actions-results">
                        <div id="actions-results-con">
                            <button name="true" onClick={this.swap}>Structured</button>
                            <button name="false" onClick={this.swap}>Trytes</button>
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
                        {this.props.result.trytes}
                    </div>
                    <div className="actions-results">
                        <div id="actions-results-con">
                            <button name="true" onClick={this.swap}>Structured</button>
                            <button name="false" onClick={this.swap}>Trytes</button>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
};

export default Addresses;