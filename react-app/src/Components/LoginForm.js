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
        return  <div className="front">
                <div className="header">
                    <button onClick={this.props.swapLog} name={"register"} className="btnNotSelected">Register</button>
                    <button onClick={this.props.swapLog} name={"login"} className="btnSelected">Login</button>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="body">
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
                    </div>
                    <div className="feet">                    
                        <button type='submit' onClick={this.request}>Submit</button>
                    </div>
            </form></div>
    };
};

export default LoginForm;