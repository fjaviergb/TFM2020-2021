import React, {Component} from 'react';
import Service from "../../services/service.js";

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
        return  <div id="login">
                <div className="header">
                    <button onClick={this.props.swapLog}
                            name={"register"}>Register</button>
                    <button onClick={this.props.swapLog}
                            name={"login"}>Login</button>
                </div>
                <div className="body">
                    <form onSubmit={this.onSubmit}>
                        <input type='text'
                            placeholder="Enter your email"
                            name='contact'
                            onChange={this.onChange}
                            value={this.state.contact}/>           
                        <input type='text'
                            placeholder="Enter your password"
                            name='passwd'
                            onChange={this.onChange}
                            value={this.state.passwd}/>
                  
                        <button type='submit' onClick={this.request}>Submit</button>
                    </form>
                </div>
            </div>
    };
};

export default LoginForm;