import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

const ENTER_KEY = 13;
const TAB_KEY = 9;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;

export default class ReactTagsEditor extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    delimiters: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  static defaultProps = {
    tags: [],
    delimiters: [ENTER_KEY, TAB_KEY, COMMA_KEY],
  }

  state = { inputValue: '', tags: this.props.tags || [] }

  componentWillUpdate(nextProps) {
    if (nextProps.tags !== this.props.tags) {
      this.setState({ tags: nextProps.tags });
    }
  }

  handleInsertTag = () => {
    const { tags, inputValue } = this.state;
    this.setState({ tags: _.concat(tags, inputValue), inputValue: '' });
  }

  handleInputChange = (e) => {
    if (_.includes([','], e.target.value)) return;
    this.setState({ inputValue: e.target.value });
  }

  handleDeleteLastTag = () => {
    const { tags } = this.state;
    this.setState({ tags: _.dropRight(tags) });
  }

  handleDeleteTag = (index) => {
    const { tags } = this.state;
    this.setState({ tags: _.filter(tags, (t, i) => i !== index) });
  }

  handleKeyDown = (e) => {
    const { inputValue } = this.state;
    if (_.includes(this.props.delimiters, e.keyCode)) {
      this.handleInsertTag();
    }
    if (_.isEmpty(inputValue) && BACKSPACE_KEY === e.keyCode) {
      this.handleDeleteLastTag();
    }
  }

  render() {
    const { tags, inputValue } = this.state;
    return (
      <div>
        {
          _.map(tags, (t, i) =>
            <span key={i}>{t}
              <button onClick={() => this.handleDeleteTag(i)}>x</button>
            </span>,
          )
        }
        <input
          type="text"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleInputChange}
          value={inputValue}
        />
      </div>
    );
  }
}
