import React, {Component} from 'react';
import './Task.css'
import PropTypes from 'prop-types';



class Task extends Component {

    render () {
        const {task} = this.props;

        // style dinámico
        const btnDelete = {
            fontSize:'18px',
            background: task.status ? 'grey' : 'red',
        };
        
        return <div className="red">
        {task.id} - {task.name} - {task.status}
        <input type="checkbox" onChange={this.props.checkStatus.bind(this,task.id)}/>
        <button style={btnDelete} onClick={this.props.delTask.bind(this,task.id)}>X</button>
        </div>
    }

};

Task.propTypes = {
    task: PropTypes.object.isRequired
}
export default Task;
