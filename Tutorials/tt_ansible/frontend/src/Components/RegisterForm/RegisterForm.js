import React, {Component} from 'react';
import Service from "../../services/service.js";

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
                .catch(err => {console.log(err.response.data.message)})
                Service.getTags({idcl: res.data.idcl})
                .then(res => {this.props.addTags(res.data)})
                .catch(err => {console.log(err.response.data.message)})
                Service.getPublicKeys({idcl:res.data.idcl})
                .then(res => {this.props.addPublicKeys(res.data)})
                .catch(err => {console.log(err.response.data.message)})    
            }
        })
        .catch(err => {console.log(err.response)});
    };



    render () {
        return  <div id="register">
                <div className="header">
                    <button onClick={this.props.swapLog}
                            name={"register"}
                            >Register</button>
                    <button onClick={this.props.swapLog}
                            name={"login"}
                            >Login</button>
                </div>
                <div className="body">
                    <form onSubmit={this.onSubmit}>
                        <input type='text'
                            placeholder="Enter your account name"
                            name='name'
                            onChange={this.onChange}
                            value={this.state.user}/>
                        <input type='text'
                            placeholder="Enter your password"
                            name='password'
                            onChange={this.onChange}
                            value={this.state.passwd}/>              
                        <input type='text'
                            placeholder="Enter your email"
                            name='contact'
                            onChange={this.onChange}
                            value={this.state.contact}/>
                        <button type='submit' onClick={this.request}>Submit</button>
                    </form>
                </div>
            </div>
    };
};

export default RegisterForm;