import React, {Component} from 'react';

class TaskForm extends Component {

    state = {
        title: '',
    }

    onSubmit = e => {
        this.props.addTask(this.state.title)
        e.preventDefault()
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render () {
        return <form onSubmit={this.onSubmit}>
            <input type='text'
             placeholder="New Task"
             name='title'
             onChange={this.onChange}
             value={this.state.title}/>
            <br/>
            <button type='submit'>Submit</button>
        </form>
    };
};

export default TaskForm;