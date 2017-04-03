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
    placeholder: PropTypes.string,
    regexValidation: PropTypes.string,
    errorText: PropTypes.string,
    onInsertTag: PropTypes.func,
    onDeleteTag: PropTypes.func,
    onDeleteLastTag: PropTypes.func,
  }

  static defaultProps = {
    delimiterKeys: [ENTER_KEY, TAB_KEY],
    className: 'react-tags-editor',
    readOnly: false,
  }

  state = {
    inputValue: '',
    validator: !_.isNil(this.props.regexValidation) && new RegExp(this.props.regexValidation, 'g'),
    tags: this.props.tags || [],
  }

  componentWillUpdate(nextProps) {
    if (nextProps.tags !== this.props.tags) {
      this.setState({ tags: nextProps.tags });
    }
  }

  getTags = () => this.state.tags;

  getInputValue = () => this.state.inputValue;

  handleInsertTag = () => {
    const { tags, inputValue } = this.state;
    const { onInsertTag } = this.props;
    if (_.isFunction(onInsertTag)) {
      this.setState({ inputValue: '' });
      return onInsertTag(inputValue, tags);
    }
    this.setState({ tags: _.concat(tags, inputValue), inputValue: '' });
  }

  handleInputChange = (e) => {
    const { validator } = this.state;
    const { delimiterChars } = this.props;
    const inputValue = e.target.value;

    let shouldDelimit = false;
    let isValidate = true;

    _.forEach(delimiterChars, (c) => {
      if (_.includes(inputValue, c)) {
        shouldDelimit = true;
        return false;
      }
    });

    if (!_.isEmpty(inputValue) && _.isRegExp(validator) && !validator.test(inputValue)) {
      isValidate = false;
    }

    this.setState({
      inputError: !isValidate,
      inputValue,
    });

    if (shouldDelimit && isValidate) {
      return this.handleInsertTag();
    }
  }

  handleDeleteLastTag = () => {
    const { tags } = this.state;
    const { onDeleteLastTag } = this.props;
    if (_.isFunction(onDeleteLastTag)) {
      return onDeleteLastTag();
    }
    this.setState({ tags: _.dropRight(tags) });
  }

  handleDeleteTag = (index) => {
    const { tags } = this.state;
    const { onDeleteTag } = this.props;
    if (_.isFunction(onDeleteTag)) {
      return onDeleteTag(index);
    }
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
    const { tags, inputValue, inputError } = this.state;
    const { readOnly, placeholder, errorText } = this.props;
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
          placeholder={placeholder}
        />
        {
          inputError && errorText &&
            <div className="react-tags-input-error">{errorText}</div>
        }
      </div>
    );
  }
}
