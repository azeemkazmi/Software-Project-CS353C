import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Authen from './Authen';
// import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
         <h2>Welcome To App</h2>
         <Authen />
         {/* <Dashboard /> */}
        </div>
       
      </div>
    );
  }
}

export default App;
