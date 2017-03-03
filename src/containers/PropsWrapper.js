import React, { Component } from 'react';
import NewComponent from '../components';

class PropsWrapper extends Component {
  state = {
    tags:['asdflkjasdf', 'aasldkfjalskdfj','qweroiquwer','qweaznvxc']
  }
  componentDidMount() {
    setTimeout(() => {
      console.log('setTimeout');
      this.setState({tags:['test','tqewa','qwetasdf']});
    },2000);
  }
  
  render() {
    return (
      <NewComponent tags={this.state.tags} />
    );
  }
}

export default PropsWrapper;