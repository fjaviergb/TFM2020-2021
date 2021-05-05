import React, {Component} from 'react';
import Service from '../../../services/service.js';

class ModalKeyBox extends Component {
    state = {
        toggle: false,
    };

    onChange = (e) => {
        if (this.state.toggle) {
            Service.pkeyOffIdent({
                idke:this.props.publicKey.idke,
                idid:this.props.object.idid,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({toggle: !this.state.toggle})})
            .catch(err => console.log(err.response.data.message))
        } else {
            Service.pkeyOnIdent({
                idke:this.props.publicKey.idke,
                idid:this.props.object.idid,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({toggle: !this.state.toggle})})
            .catch(err => console.log(err.response.data.message))
        }
    };

    componentDidMount(){
        Service.checkIdentKey({
            idcl:this.props.token.idcl,
            idid:this.props.object.idid,
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

    };

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