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

const getAddresses = () => {
  const addressesString = localStorage.getItem('addresses');
  const addresses = JSON.parse(addressesString);
  return addresses
}

const getTags = () => {
  const tagsString = localStorage.getItem('tags');
  const tags = JSON.parse(tagsString);
  return tags
}

const getPublicKeys = () => {
  const publicKeysString = localStorage.getItem('publicKeys');
  const publicKeys = JSON.parse(publicKeysString);
  return publicKeys
}

class App extends Component {

  state = {
    logStatus: "login",
    token: getToken(),
    mainStatus: getMainStatus(),
    addresses: getAddresses(),
    tags: getTags(),
    publicKeys: getPublicKeys()
  };

  setToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    this.setState({token: getToken()})
  };

  removeToken = (userToken) => {
    localStorage.removeItem('token');
    localStorage.removeItem('mainStatus');
    localStorage.removeItem('addresses');
    localStorage.removeItem('tags');
    localStorage.removeItem('publicKeys');
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

  addAddress = (e) => {
    this.setState({addresses: []})
    e.forEach(elem => {this.state.addresses.push(elem)})
    localStorage.setItem('addresses', JSON.stringify(this.state.addresses));
  };

  addTags = (e) => {
    this.setState({tags: []})
    e.forEach(elem => {this.state.tags.push(elem)})
    localStorage.setItem('tags', JSON.stringify(this.state.tags));
  };

  addPublicKeys = (e) => {
    this.setState({
      publicKeys: e
    })
    localStorage.setItem('publicKeys', this.state.publicKeys);
  };

  render () {
    if (!this.state.token) {
      return <div>
        <FrontPageForm swapLog={this.swapLog}
                      logStatus={this.state.logStatus}
                      setToken={this.setToken}
                      addAddresses={this.addAddress}
                      addTags={this.addTags}
                      addPublicKeys={this.addPublicKeys}/>
      </div>
    }

    return <div>
      <Router>
        <Route path='/' render = {() => {
          return <div>
              <BackPageForm removeToken={this.removeToken}
                            swapMain={this.swapMain}
                            mainStatus={this.state.mainStatus}
                            addresses={this.state.addresses}
                            tags={this.state.tags}/>
            </div>
        }}></Route>

      </Router>
    </div>
  };
}

export default App;
