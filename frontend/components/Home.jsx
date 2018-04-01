import React, { Component } from 'react';

class Home extends Component {
  render() {
    const {user} = this.props;
    return (
        <div>
          Homepage for {user.email}
        </div>
    );
  }
}

export default Home;
