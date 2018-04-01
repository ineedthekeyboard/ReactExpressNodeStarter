import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Redirect} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CssBaseline from "material-ui/CssBaseline";
import GlobalTheme from "./Theme";

// import Version from  './version';
import NavBar from "./components/NavBar";
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  isAuthorized(nextState, replaceState) {
    let token = this.props.appState.user.token;
    if (token && token !== '') {
      return true;
    }
    return false;
  }
  checkAuth(View) {
    if (this.isAuthorized()) {
      return View
    } else {
      return (<Redirect to="/login" />)
    }
  }
  render() {
    const state = this.props.appState;
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={GlobalTheme("light")}>
          <CssBaseline />
          <div className="App">
            <NavBar user={state.user} stateUpdater={this.props.setAppState}/>
            <div>
              <Route exact path="/" component={() => this.checkAuth(<Home stateUpdater={this.props.setAppState} user={state.user}/>)}/>
              <Route path="/login" render={() => <Login stateUpdater={this.props.setAppState} />}/>
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
