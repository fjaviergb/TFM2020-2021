import React, {Component} from 'react';

const GetDate = (props) => {
    const {timestamp} = props;
    var date = `${new Date(timestamp * 1000)}`
    return (<div>{date}</div>)
};

class Addresses extends Component {
    state = {
        show: true,
    }

    swap = (e) => {
        this.setState({show: !this.state.show})
    }
    render() {
        if(this.state.show){
            return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
                <div className="modal" id="modal">
                    <div className="content">
                        <h3>{this.props.result.name}</h3>
                        <div>Message: <br/>{this.props.result.message}</div><br/>
                        <div>Address: <br/>{this.props.result.address}</div><br/>
                        <div>Tag: <br/>{this.props.result.tag}</div><br/>
                        <div>Date: <br/><GetDate timestamp={this.props.result.timestamp}/></div><br/>
  
                    </div>
                    <div className="actions">
                        <select name="select" size="2" onChange={this.swap} value="first">
                            <option defaultValue="first">Estruturado</option>
                            <option>Trytes</option>
                        </select>

                        <button className="toggle-button" onClick={this.props.closeModal}>
                            close
                        </button>
                    </div>
                </div>
            </div>
        } else {
            return <div>
            <div className="modalContainer" onClick={this.props.closeModal}></div>
                <div className="modal" id="modal">
                    <div className="content">
                        {this.props.result.trytes}
                    </div>
                    <div className="actions">
                        <select name="select" size="2" onChange={this.swap}>
                            <option>Estruturado</option>
                            <option>Trytes</option>
                        </select>

                        <button className="toggle-button" onClick={this.props.closeModal}>
                            close
                        </button>
                    </div>
                </div>
            </div>
        }
    }
};

export default Addresses;