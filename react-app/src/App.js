import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import FrontPageForm from './Components/FrontPageForm.js'

class App extends Component {
  state = {
    status: "login"
  };

  onClick = (e) => {
      this.setState({status: e.target.name})
  }

  render () {
    return <div>
      <Router>
        <Route path='/' render = {() => {
          return <div>
            <button onClick={this.onClick} name={"register"}>Register</button>
            <button onClick={this.onClick} name={"login"}>Login</button>
            <FrontPageForm status={this.state.status}/>
            </div>
        }}></Route>
      </Router>
    </div>
  };
}

export default App;
