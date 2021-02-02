import React, {Component} from 'react';

import Task from "./Task.js"
import PropTypes from 'prop-types';

class Tasks extends Component {
    
    render() {
        return this.props.tasks.map((el) =>
        <Task
         task={el}
         delTask={this.props.delTask}
         checkStatus={this.props.checkStatus}
         key={el.id}/>);
    }
}

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired,
}
// 1:35
export default Tasks;