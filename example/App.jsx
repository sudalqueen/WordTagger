import React from 'react';
import ReactDOM from 'react-dom';

import TagEditor from '../src/component/TagEditor.jsx';
import CustomTooltip from './CustomToolTip.jsx';
import './App.css';

function App() {
  const map = new Map();

  const tags = [
    { name: "Name" },
    { name: "Gender" }
  ]

  const tags2 = [
    { name: "Fruits",
      color: "lightblue" },
    { name: "Nothing!",
      color: "lightpink" }
  ]

  function onChange(info) {
    console.log(info);
  }

  function onClickTag(name, word, tagged) {
    const arr = map.get(name) || [];

    if (tagged) {
      arr.push(word);
    } else {
      const index = arr.indexOf(word);
      arr.splice(index, 1);
    }
    console.log(name, word, tagged)
  }

  return (
    <div className="App">
      <TagEditor
        value="test text"
        tags={tags}
        divClassName={"firstTag"}
        onChange={onChange}
        onClickTag={onClickTag}
        customTooltip={CustomTooltip} />
      <br />
      <TagEditor value="This is apple, banana, orange!" tags={tags2} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
