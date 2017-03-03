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
  handleGetTags = () => {
    console.log(this.refs.component);
    const t = this.refs.component.getTags();
    console.log(t);
    this.setState({t});
  }
  render() {
    return (
      <div>
        <NewComponent
          ref="component"
          tags={this.state.tags}
          delimiterChars={[',']}
        />
          {/*readOnly={true}*/}
        <button onClick={this.handleGetTags}>TEST</button>
        {this.state.t}
      </div>
    );
  }
}

export default PropsWrapper;