import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import FrontPageForm from './Components/FrontPageForm.js'

const getToken = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}

class App extends Component {

  state = {
    status: "login",
    token: getToken(),
  };

  setToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    this.setState({token: getToken()})

  }

  swap = (e) => {
      this.setState({status: e.target.name})
  };

  render () {
    if (!this.state.token) {
      return <div>
        <FrontPageForm swap={this.swap}
                      status={this.state.status}
                      setToken={this.setToken}/>
      </div>
    }

    return <div>
      <Router>
        <Route path='/' render = {() => {
          return <div>
              LOGEADOS
            </div>
        }}></Route>

      </Router>
    </div>
  };
}

export default App;
