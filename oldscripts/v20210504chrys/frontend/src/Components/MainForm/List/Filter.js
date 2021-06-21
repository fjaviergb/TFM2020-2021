import React, {Component} from 'react';
class Filter extends Component {
    state = {

    };
    onClick = () => {
        this.props.removeFilter(this.props.result)
    };

    render () {
        return <span className="filterObj" onClick={this.onClick}>{this.props.result}</span>
    }
};

export default Filter;