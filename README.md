# react-tags-editor
[![MIT](https://img.shields.io/npm/l/react-tag-input.svg?style=flat-square)](https://github.com/prakhar1989/react-tags/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/react-tag-input.svg?style=flat-square)](https://www.npmjs.com/package/react-tags-editor)

React-Tags-Editor that works out of the box

## How to install
```
npm install react-tags-editor --save
```

## How to use
1. Simply add ReactTagsEditor component to use.
2. Add ref to the component to get the current tags using ```getTags()```
```
import React, {Component} from 'react'
import {render} from 'react-dom'
import TagsEditor from 'react-tags-editor'

class App extends Component {
  render () { 
    return (
      <div>
        <h1>React Tags Editor</h1>
        <TagsEditor ref={c => { this.tagsEditor = c; }}/>
        <button onClick={() => alert(this.tagsEditor.getTags())}>
          Get Tags
        </button>
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))
```
