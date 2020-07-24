import React from 'react';
import './App.css';
import TagEditor from './component/TagEditor';
import CustomTooltip from './component/Tooltip/CustomToolTip'

function App() {
  const map = new Map();

  const tags = [
    { name: "Name" },
    { name: "Gender" }
  ]

  const tags2 = [
    { name: "Fruits" },
    { name: "Nothing!" }
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

export default App;
