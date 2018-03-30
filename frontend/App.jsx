import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CssBaseline from "material-ui/CssBaseline";
import GlobalTheme from "./Theme";

// import Version from  './version';
import NavBar from "./components/NavBar";
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={GlobalTheme("light")}>
          <CssBaseline />
          <div className="App">
            <NavBar/>
            <div style={{padding: '1rem', height:'1rem'}} />
            <div>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
