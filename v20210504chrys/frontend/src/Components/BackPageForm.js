import React, {Component} from 'react';
import PreferenceForm from './PreferenceForm/PreferenceForm.js';
import MainForm from './MainForm/MainForm.js';

class BackPageForm extends Component{
    render() {
        if (this.props.mainStatus === "preference") {
            return <PreferenceForm swapMain={this.props.swapMain}
                              setToken={this.props.setToken}
                              ident={this.props.ident}
                              token={this.props.token}
                              changeIdent={this.props.changeIdent}
                              changePublicKeys={this.props.changePublicKeys}
                              publicKeys={this.props.publicKeys}
                              newIdent={this.props.newIdent}
                              newPublicKey={this.props.newPublicKey}
                              deleteIdent={this.props.deleteIdent}
                              deletePublicKey={this.props.deletePublicKey}
                              removeToken={this.props.removeToken}/>
        }
        else {
            return <MainForm swapMain={this.props.swapMain}
                          setToken={this.props.setToken}
                          publicKeys={this.props.publicKeys}
                          ident={this.props.ident}
                          token={this.props.token}
                          removeToken={this.props.removeToken}/>
        }
    };
};

export default BackPageForm;