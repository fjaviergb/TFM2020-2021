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
        .then(res => {
            console.log(res.data);
            if (res.data.type){
                Service.getAddresses({idcl: res.data.idcl})
                .then(res => {
                    this.props.addAddresses(res.data)})
                .catch(err => {console.log(err.data)})
                Service.getTags({idcl: res.data.idcl})
                .then(res => {
                    this.props.addTags(res.data)})
                .catch(err => {console.log(err.data)})
                Service.getPublicKeys({idcl:res.data.idcl})
                .then(res => {
                    this.props.addPublicKeys(res.data)})
                .catch(err => {console.log(err.data)})  
                this.props.setToken({
                    token: res.data.token,
                    idcl:res.data.idcl,
                    name:res.data.name
                });
            }  
        })
        .catch(err => {console.log(err.data)});
    };

    render () {
        return  <div>
                <button onClick={this.props.swapLog} name={"register"}>Register</button>
                <button onClick={this.props.swapLog} name={"login"}>Login</button>
                <form onSubmit={this.onSubmit}>
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
            </form></div>
    };
};

export default LoginForm;