import React, {Component} from 'react';
import Service from "../services/service.js";

class RegisterForm extends Component {

    state = {
        name: '',
        password: '',
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
        .then(res => {
            console.log(res.data);
            if (res.data.type) {
                this.props.setToken({
                    token: res.data.token,
                    idcl:res.data.idcl,
                    name:res.data.name
                });  
                Service.getAddresses({idcl: res.data.idcl})
                .then(res => {this.props.addAddresses(res.data)})
                .catch(err => {console.log(err.data)})
                Service.getTags({idcl: res.data.idcl})
                .then(res => {this.props.addTags(res.data)})
                .catch(err => {console.log(err.data)})
                Service.getPublicKeys({idcl:res.data.idcl})
                .then(res => {this.props.addPublicKeys(res.data)})
                .catch(err => {console.log(err.data)})    
            }
        })
        .catch(err => {console.log(err.data.message)});
    };


    render () {
        return  <div>
                <button onClick={this.props.swapLog} name={"register"}>Register</button>
                <button onClick={this.props.swapLog} name={"login"}>Login</button>
                <form onSubmit={this.onSubmit}>
                <input type='text'
                    placeholder="Enter your account name"
                    name='name'
                    onChange={this.onChange}
                    value={this.state.user}/>
                <br/>
                <input type='text'
                    placeholder="Enter your password"
                    name='password'
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
            </form></div>
    };
};

export default RegisterForm;