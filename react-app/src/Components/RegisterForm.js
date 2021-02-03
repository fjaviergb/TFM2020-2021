import React, {Component} from 'react';
import Service from "../services/service.js";

class RegisterForm extends Component {

    state = {
        user: '',
        passwd: '',
        contact: '',
    }

    onSubmit = e => {
        e.preventDefault()
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    request = () => {
        Service.register(this.state)
        .then(res => {console.log('Recibido')})
        .catch(err => {console.log('Error')});
    };


    render () {
        return <form onSubmit={this.onSubmit}>
                <input type='text'
                    placeholder="Enter your account name"
                    name='user'
                    onChange={this.onChange}
                    value={this.state.user}/>
                <br/>
                <input type='text'
                    placeholder="Enter your password"
                    name='passwd'
                    onChange={this.onChange}
                    value={this.state.passwd}/>
                <br/>                    
                <input type='text'
                    placeholder="Enter your email"
                    name='contact'
                    onChange={this.onChange}
                    value={this.state.contact}/>
                <br/>
                <button type='submit' onClick={this.request}>Register</button>
        </form>
    };
};

export default RegisterForm;