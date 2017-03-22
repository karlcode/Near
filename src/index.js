import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Header from './components/Header';
import './styles/main.css';

ReactDOM.render(
  <div>
    <Header />
    <App />
  </div>,
  document.getElementById('root')
);
