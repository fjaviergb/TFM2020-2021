import React, {Component} from 'react';
import RegisterForm from './RegisterForm/RegisterForm.js'
import LoginForm from './LoginForm/LoginForm.js'
//import PropTypes from 'prop-types';

class FrontPageForm extends Component {
    render() { 
            if (this.props.logStatus === "register") {
                return <RegisterForm swapLog={this.props.swapLog}
                                    setToken={this.props.setToken}
                                    addIdent={this.props.addIdent}
                                    addPublicKeys={this.props.addPublicKeys}/>
}
            else if (this.props.logStatus === "login") {
                return <LoginForm swapLog={this.props.swapLog}
                                  setToken={this.props.setToken}
                                  addIdent={this.props.addIdent}
                                  addPublicKeys={this.props.addPublicKeys}/>
            }
    };
};

export default FrontPageForm;