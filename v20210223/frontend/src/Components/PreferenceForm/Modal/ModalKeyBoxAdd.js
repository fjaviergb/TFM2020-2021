import React, {Component} from 'react';
import Service from '../../../services/service.js';

class ModalKeyBox extends Component {
    state = {
        toggle: false,
    };

    onChange = (e) => {
        if (this.state.toggle) {
            Service.pkeyOffAdd({
                idke:this.props.publicKey.idke,
                idad:this.props.object.idad,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({toggle: !this.state.toggle})})
            .catch(err => console.log(err.response.data.message))
        } else {
            Service.pkeyOnAdd({
                idke:this.props.publicKey.idke,
                idad:this.props.object.idad,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({toggle: !this.state.toggle})})
            .catch(err => console.log(err.response.data.message))
        }
    };

    componentDidMount(){
        Service.checkAddKey({
            idcl:this.props.token.idcl,
            idad:this.props.object.idad,
            idke:this.props.publicKey.idke
        })
        .then(res => {
            if (res.data.len !== 0) {
                this.setState({toggle: true})
            } else {
                this.setState({toggle: false})
            }
        })
        .catch(err => {
            console.log(err.response.data.message);
            this.setState({toggle: false})
        })

    }
    render() {
            return <div className="keyoptions">{this.props.publicKey.alias} 
                <input type="checkbox"
                        onChange={this.onChange}
                        checked={this.state.toggle}
                        className="check"></input>
                </div>
    };
};

export default ModalKeyBox;