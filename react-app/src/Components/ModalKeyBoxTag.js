import React, {Component} from 'react';
import Service from '../services/service.js';

const checkTagKey = (idcl,idta) => {
    var status = false;
    Service.checkTagKey({
        idcl:idcl,
        idta:idta
    })
    .then(res => {
        if (res.data.len > 0) {
            status = true;
        } else {
            status = false;
        }
    })
    .catch(err => {
        console.log(err);
        status = false;
    })
    return status;
};


class ModalKeyBox extends Component {
    state = {
        logged: false,
        status: checkTagKey(this.props.token.idcl,this.props.object.idta)
    };

    onChange = (e) => {
        if (this.state.logged) {
            Service.pkeyOffTag({
                idke:this.props.publicKey.idke,
                idta:this.props.object.idta,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({logged: !this.state.logged})})
            .catch(err => console.log(err))
        } else {
            Service.pkeyOnTag({
                idke:this.props.publicKey.idke,
                idta:this.props.object.idta,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({logged: !this.state.logged})})
            .catch(err => console.log(err))
        }
    };

    render() {
        if (this.state.status === false) {
            return <div>{this.props.publicKey.alias}
                <input type="checkbox" onChange={this.onChange}></input>
                </div>
        } else {
            return <div>{this.props.publicKey.alias}
                <input type="checkbox" onChange={this.onChange} checked></input>
                </div>       
        }
    };
};

export default ModalKeyBox;