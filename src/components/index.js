import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

const ENTER_KEY = 13;
const TAB_KEY = 9;
const BACKSPACE_KEY = 8;

export default class ReactTagsEditor extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    delimiterKeys: PropTypes.arrayOf(PropTypes.number).isRequired,
    delimiterChars: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    tags: [],
    delimiterKeys: [ENTER_KEY, TAB_KEY],
    delimiterChars: [],
    className: 'react-tags-editor',
    readOnly: false,
  }

  state = {
    inputValue: '',
    tags: this.props.tags || [],
  }

  componentWillUpdate(nextProps) {
    if (nextProps.tags !== this.props.tags) {
      this.setState({ tags: nextProps.tags });
    }
  }

  getTags = () => this.state.tags;

  handleInsertTag = () => {
    const { tags, inputValue } = this.state;
    this.setState({ tags: _.concat(tags, inputValue), inputValue: '' });
  }

  handleInputChange = (e) => {
    const inputValue = e.target.value;
    let shouldDelimit = false;
    _.forEach(this.props.delimiterChars, (c) => {
      if (_.includes(inputValue, c)) {
        shouldDelimit = true;
        return false;
      }
    });
    if (shouldDelimit) {
      return this.handleInsertTag();
    }
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
    if (_.includes(this.props.delimiterKeys, e.keyCode) && !_.isEmpty(inputValue)) {
      if (e.keyCode === TAB_KEY) {
        e.preventDefault();
      }
      this.handleInsertTag();
    }
    if (_.isEmpty(inputValue) && BACKSPACE_KEY === e.keyCode) {
      this.handleDeleteLastTag();
    }
  }

  render() {
    const { tags, inputValue } = this.state;
    const { readOnly } = this.props;
    if (readOnly) {
      return (
        <div className={this.props.className}>
          {
            _.map(tags, (tag, index) =>
              <span key={index} className="react-tags">
                {tag}
              </span>)
          }
        </div>
      );
    }
    return (
      <div className={this.props.className}>
        {
          _.map(tags, (tag, index) =>
            <span key={index} className="react-tags">
              {tag}
              <button
                className="react-tags-close-btn"
                onClick={() => this.handleDeleteTag(index)}
              >
                x
              </button>
            </span>)
        }
        <input
          className="react-tags-input"
          type="text"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleInputChange}
          value={inputValue}
        />
      </div>
    );
  }
}
