import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './Test1.scss';

class Test1 extends Component {
  render() {
    return (
        <div className="Test1">
          <header className="font-override">
            <h1>Test 1</h1>
          </header>
          <p>hello WORLD</p>
          <RaisedButton label="Default" />
        </div>
    );
  }
}

export default Test1;
