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
            return <div>
                <div onClick={this.closeModal}>{this.props.result.name}</div>
                    <Result result={this.props.result}
                            closeModal={this.closeModal}/>
            </div>
        } else {
            return <div>
                <div onClick={this.openModal}>{this.props.result.name}</div>
            </div>
        };
    };

};

export default Results;