import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import tasks from './sample/tasks.json';
import Tasks from './Components/Tasks.js';
import TaskForm from './Components/TaskForm.js';

class App extends Component {

  state = {
    tasks: tasks
  }

  addTask = (title) => {
      const newTask = {
        name: title,
        id: this.state.tasks.length + 1
      }
      this.setState({
        tasks: [...this.state.tasks, newTask]
      })
  }

  delTask = (id) => {
    const newTasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({tasks: newTasks})
  };

  checkStatus = (id) => {
    const newTasks = this.state.tasks.map(task => {
      if(task.id === id) {task.status = !task.status}
      return task;
    })
    this.setState({tasks: newTasks})
  };

  render () {
    return <div>
      <Router><Route exact path='/' render = {() => {
        return <div>
          <TaskForm addTask={this.addTask}/>
          <Tasks tasks={this.state.tasks} delTask={this.delTask} checkStatus={this.checkStatus}/>
        </div>
      }}></Route></Router>
    </div>
  }
};

export default App;
