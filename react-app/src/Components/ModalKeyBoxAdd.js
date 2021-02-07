import React, {Component} from 'react';
import Service from '../services/service.js';



class ModalKeyBox extends Component {
    state = {
        logged: false,
    };

    onChange = (e) => {
        if (this.state.logged) {
            Service.pkeyOffAdd({
                idke:this.props.publicKey.idke,
                idad:this.props.object.idad,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({logged: !this.state.logged})})
            .catch(err => console.log(err))
        } else {
            Service.pkeyOnAdd({
                idke:this.props.publicKey.idke,
                idad:this.props.object.idad,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({logged: !this.state.logged})})
            .catch(err => console.log(err))
        }
    };

    componentDidMount(){
        Service.checkAddKey({
            idcl:this.props.token.idcl,
            idad:this.props.object.idad
        })
        .then(res => {
            if (res.data.len !== 0) {
                this.setState({logged: true})
            } else {
                this.setState({logged: false})
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({logged: false})
        })

    }
    render() {
        if (this.state.logged === false) {
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