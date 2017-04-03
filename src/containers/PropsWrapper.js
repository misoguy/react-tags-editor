import React, { Component } from 'react';
import _ from 'lodash';
import NewComponent from '../components';

class PropsWrapper extends Component {
  state = {
    tags: ['asdflkjasdf', 'aasldkfjalskdfj', 'qweroiquwer', 'qweaznvxc'],
  }
  componentDidMount() {
    setTimeout(() => {
      console.log('setTimeout');
      this.setState({ tags: ['test', 'tqewa', 'qwetasdf'] });
    }, 2000);
  }
  handleGetTags = () => {
    console.log(this.component);
    const t = this.component.getTags();
    console.log(t);
    this.setState({ t });
  }
  handleInsertTag = (input, tags) => {
    console.log('input', input);
    console.log('tags', tags);
    this.setState({ tags: _.concat(this.state.tags, input) });
  }
  handleDeleteTag = (index) => {
    console.log('props');
    const { tags } = this.state;
    this.setState({ tags: _.filter(tags, (t, i) => i !== index) });
  }
  handleDeleteLastTag = () => {
    console.log('props');
    this.setState({ tags: _.dropRight(this.state.tags) });
  }
  handleTest = () => {
    console.log(this.component.getInputValue());
  }
  render() {
    return (
      <div>
        <NewComponent
          ref={(c) => { this.component = c; }}
          tags={this.state.tags}
          delimiterChars={[',']}
          regexValidation="[a-zA-Z]"
          errorText="You have an error!"
          placeholder={'test'}
          onInsertTag={this.handleInsertTag}
          onDeleteTag={this.handleDeleteTag}
          onDeleteLastTag={this.handleDeleteLastTag}
        />
        {/* readOnly={true}*/}
        <button onClick={this.handleGetTags}>TEST</button>
        <button onClick={this.handleTest}>TEST button</button>
        {this.state.t}
      </div>
    );
  }
}

export default PropsWrapper;
