import React from 'react';
import './App.css';

// Los componentes tienen la primera letra en mayuscula
// function Helloworld (props) {
//   return (
//     <div id='hello'>{props.mytext}</div>
//   )
// };

class Helloworld extends React.Component {

  // Estados (propiedades) del objecto
  state = {
    show: true,
  }

  toggleShow = () => {
    this.setState({show: !this.state.show})
  };

  render() {
    if (this.state.show) {
      return (
      <div id='hello'>{this.props.mytext}
      <button onClick={this.toggleShow}>Click</button>
      </div>
      )
    } else {return (<div id='hello'>No elements <button onClick={this.toggleShow}>Click</button></div>)}
  }
};

function App() {
  return (
    // El codigo que se representa aquí es JSX (versión JS de html)
    // Ir a babel.js para ver conversiones para saber a qué esta sustituyendo
    <div>This is my component: 
      <Helloworld mytext='COVADUNGA'/>
      <Helloworld mytext='SAKALAKABUM '/></div>
    );
}

export default App;
