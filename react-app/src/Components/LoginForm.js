import React, {Component} from 'react';
import Service from "../services/service.js";

class LoginForm extends Component {

    state = {
        contact: '',
        passwd: '',
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
        Service.login(this.state)
        .then(res => {console.log(res.data)})
        .catch(err => {console.log(err.data)});
    };

    render () {
        return <form onSubmit={this.onSubmit}>
                <input type='text'
                    placeholder="Enter your email"
                    name='contact'
                    onChange={this.onChange}
                    value={this.state.contact}/>
                <br/>            
                <input type='text'
                    placeholder="Enter your password"
                    name='passwd'
                    onChange={this.onChange}
                    value={this.state.passwd}/>
                <br/>                    
                <button type='submit' onClick={this.request}>Login</button>
        </form>
    };
};

export default LoginForm;