import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Test1 from './components/Test1/Test1';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Full stack react</h1>
            </header>
            <nav>
              <Link to="/">Home</Link>
              <br></br>
              <Link to="/test1">test1</Link>
            </nav>
            <div>
              <Route exact path="/" component={Home}/>
              <Route path="/test1" component={Test1}/>
            </div>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
