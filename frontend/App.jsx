import React from 'react';
import Hello from './components/Hello';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <Hello name="World!" />
    <h2>An amazing start to a react application {'\u2728'}</h2>
  </div>
);

export default App;
