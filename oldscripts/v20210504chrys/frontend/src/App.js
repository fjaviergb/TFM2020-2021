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

const getIdent = () => {
  const identString = localStorage.getItem('ident');
  const ident = JSON.parse(identString);
  return ident
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
    ident: getIdent(),
    publicKeys: getPublicKeys()
  };

  setToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    this.setState({token: getToken()})
  };

  removeToken = (userToken) => {
    localStorage.removeItem('token');
    localStorage.removeItem('mainStatus');
    localStorage.removeItem('ident');
    localStorage.removeItem('publicKeys');
    this.setState({token: ''})
    this.setState({mainStatus: 'main'})
  };

  swapLog = (e) => {
      this.setState({logStatus: e.target.name})
  };

  swapMain = (e) => {
    localStorage.setItem('mainStatus', JSON.stringify(e.target.name));
    this.setState({mainStatus: e.target.name})
  };

  addIdent = (e) => {
    this.setState({ident: []})
    e.forEach(elem => {this.state.ident.push(elem)})
    localStorage.setItem('ident', JSON.stringify(this.state.ident));
  };

  addPublicKeys = (e) => {
    this.setState({publicKeys: []})
    e.forEach(elem => {this.state.publicKeys.push(elem)})
    localStorage.setItem('publicKeys', JSON.stringify(this.state.publicKeys));
  };

  changeIdent = (e) => {
    const ident = this.state.ident.map(elem => {;
      if (elem.idid === e.idid) {elem.alias = e.alias}
      return elem;
    });

    this.setState({ident: ident})
    localStorage.setItem('ident', JSON.stringify(this.state.ident));
  };

  changePublicKey = (e) => {
    const publicKeys = this.state.publicKeys.map(elem => {;
      if (elem.idke === e.idke) {elem.alias = e.alias}
      return elem;
    });

    this.setState({publicKeys: publicKeys})
    localStorage.setItem('publicKeys', JSON.stringify(this.state.publicKeys));
  };

  newIdent = (e) => {
    this.setState({ident: [...this.state.ident,e]});
    localStorage.setItem('ident', JSON.stringify(this.state.ident));
  };

  newPublicKey = (e) => {
    this.setState({publicKeys: [...this.state.publicKeys,e]});
    localStorage.setItem('publicKeys', JSON.stringify(this.state.publicKeys));
  };

  deleteIdent = (cond) => {
    const newIdent = this.state.ident.filter(elem => elem.idname !== cond);
    this.setState({ident: newIdent});
    localStorage.setItem('ident', JSON.stringify(this.state.ident));
  };

  deletePublicKey = (cond) => {
    const newPublicKeys = this.state.publicKeys.filter(elem => elem.idname !== cond);
    this.setState({publicKeys: newPublicKeys});
    localStorage.setItem('publicKeys', JSON.stringify(this.state.publicKeys));
  };

  render () {
    if (!this.state.token) {
      return <div id="front">
        <FrontPageForm swapLog={this.swapLog}
                      logStatus={this.state.logStatus}
                      setToken={this.setToken}
                      addIdent={this.addIdent}
                      addPublicKeys={this.addPublicKeys}/>
      </div>
    }

    return <div>
      <Router>
        <Route path='/' render = {() => {
          return <div id="back">
              <BackPageForm removeToken={this.removeToken}
                            swapMain={this.swapMain}
                            mainStatus={this.state.mainStatus}
                            ident={this.state.ident}
                            changeIdent={this.changeIdent}
                            token={this.state.token}
                            changePublicKeys={this.changePublicKey}
                            publicKeys={this.state.publicKeys}
                            newIdent={this.newIdent}
                            newPublicKey={this.newPublicKey}
                            deleteIdent={this.deleteIdent}
                            deletePublicKey={this.deletePublicKey}/>
            </div>
        }}></Route>
      </Router>
    </div>
  };
}

export default App;
