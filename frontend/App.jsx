import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import './App.scss';

// import Version from  './version';
import Login from './components/Login/Login';
import Test1 from './components/Test1/Test1';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Full stack react build:{2}</h1>
            </header>
            <nav>
              <Link to="/">Home</Link>
              <br></br>
              <Link to="/test1">test1</Link>
              <br></br>
              <Link to="/login">Login</Link>
            </nav>
            <div>
              <Route exact path="/" component={Home}/>
              <Route path="/test1" component={Test1}/>
              <Route path="/login" component={Login}/>
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
