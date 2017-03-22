import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Near, the local thing finder</h2>
            <form>
            
              <input id="mainInput" type="text" name="name" placeholder="Where U at?" />
            
            <button id="YOLO" type="submit"> SUBMIT </button>
          </form>
          
          
        </div>
        
      </div>
    );
  }
}
componentDidMount()
export default App;
