import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import FrontPageForm from './Components/FrontPageForm.js'
import BackPageForm from './Components/BackPageForm.js'

// Local Storage
const getToken = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}

const getMainStatus = () => {
  const mainStatusString = localStorage.getItem('mainStatus');
  const mainStatus = JSON.parse(mainStatusString);
  return mainStatus
}


class App extends Component {

  state = {
    logStatus: "login",
    token: getToken(),
    mainStatus: getMainStatus(),
  };

  setToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    this.setState({token: getToken()})
  };

  removeToken = (userToken) => {
    localStorage.removeItem('token');
    localStorage.removeItem('mainStatus');
    this.setState({token: ''})
  };

  swapLog = (e) => {
      this.setState({logStatus: e.target.name})
  };
  swapMain = (e) => {
    localStorage.setItem('mainStatus', JSON.stringify(e.target.name));
    this.setState({mainStatus: e.target.name})
    this.setState({mainStatus: getMainStatus()})
  };


  render () {
    if (!this.state.token) {
      return <div>
        <FrontPageForm swapLog={this.swapLog}
                      logStatus={this.state.logStatus}
                      setToken={this.setToken}/>
      </div>
    }

    return <div>
      <Router>
        <Route path='/' render = {() => {
          return <div>
              <BackPageForm removeToken={this.removeToken}
                            swapMain={this.swapMain}
                            mainStatus={this.state.mainStatus}/>
            </div>
        }}></Route>

      </Router>
    </div>
  };
}

export default App;
