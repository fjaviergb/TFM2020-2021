import React, {Component} from 'react';
import Service from '../../../services/service.js';

class ModalKeyBox extends Component {
    state = {
        toggle: false,
    };

    onChange = (e) => {
        if (this.state.toggle) {
            Service.pkeyOffTag({
                idke:this.props.publicKey.idke,
                idta:this.props.object.idta,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({toggle: !this.state.toggle})})
            .catch(err => console.log(err))
        } else {
            Service.pkeyOnTag({
                idke:this.props.publicKey.idke,
                idta:this.props.object.idta,
                idcl:this.props.token.idcl
            }).then(res => {this.setState({toggle: !this.state.toggle})})
            .catch(err => console.log(err))
        }
    };

    componentDidMount(){
        Service.checkTagKey({
            idcl:this.props.token.idcl,
            idta:this.props.object.idta,
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
            console.log(err);
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