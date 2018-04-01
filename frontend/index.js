import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import StateManager from "./components/StateManager.jsx";
import registerServiceWorker from './registerServiceWorker';
import './App.scss';
ReactDOM.render(<StateManager><App /></StateManager>, document.getElementById('root'));
registerServiceWorker();
