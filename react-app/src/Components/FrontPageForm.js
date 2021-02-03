import React, {Component} from 'react';
import RegisterForm from './RegisterForm.js'
import LoginForm from './LoginForm.js'
//import PropTypes from 'prop-types';

class FrontPageForm extends Component {
    render() { 
        if (this.props.status === "register") {return <RegisterForm/>}
        else {return <LoginForm/>}
    };
};

export default FrontPageForm;