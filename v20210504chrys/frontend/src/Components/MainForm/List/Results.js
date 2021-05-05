import React, {Component} from 'react';
import Result from '../Modal/Result.js'

class Results extends Component {
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
                         <div className="fronttitle"><b>Index:</b> {this.props.result.name}</div>
                         <div className="frontcont"><b>Message:</b> {this.props.result.message}</div>
                         <div className="frontcont"><b>Timestamp:</b> {this.props.result.timestamp}</div>
                </div>
                <Result result={this.props.result}
                        closeModal={this.closeModal}/>
            </div>
        } else {
            return <div className="elem">
                <div onClick={this.openModal}
                     className="front">
                        <div className="fronttitle"><b>Index:</b> {this.props.result.name}</div>
                        <div className="frontcont"><b>Message:</b> {this.props.result.message}</div>
                        <div className="frontcont"><b>Timestamp:</b> {this.props.result.timestamp}</div>
                </div>
            </div>
        };
    };

};

export default Results;