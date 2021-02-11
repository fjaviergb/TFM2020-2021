import React, {Component} from 'react';
import PreferenceForm from './PreferenceForm/PreferenceForm.js';
import MainForm from './MainForm/MainForm.js';

class BackPageForm extends Component{
    render() {
        if (this.props.mainStatus === "preference") {
            return <PreferenceForm swapMain={this.props.swapMain}
                              setToken={this.props.setToken}
                              addresses={this.props.addresses}
                              tags={this.props.tags}
                              token={this.props.token}
                              changeAddresses={this.props.changeAddresses}
                              changeTags={this.props.changeTags}
                              changePublicKeys={this.props.changePublicKeys}
                              publicKeys={this.props.publicKeys}
                              newAddress={this.props.newAddress}
                              newTag={this.props.newTag}
                              newPublicKey={this.props.newPublicKey}
                              deleteAddress={this.props.deleteAddress}
                              deleteTag={this.props.deleteTag}
                              deletePublicKey={this.props.deletePublicKey}
                              removeToken={this.props.removeToken}/>
        }
        else if (this.props.mainStatus === "main") {
            return <MainForm swapMain={this.props.swapMain}
                          setToken={this.props.setToken}
                          publicKeys={this.props.publicKeys}
                          addresses={this.props.addresses}
                          tags={this.props.tags}
                          token={this.props.token}
                          removeToken={this.props.removeToken}/>
        }
    };
};

export default BackPageForm;