import React, { useState } from 'react';
import Tooltip from './Tooltip';
import '../style/Word.css';

const map = new Map();

function WordView() {
    const [tags, setTags] = useState([{
        tag: 'Fruits',
        color: 'lightcoral',
        chekced: false
    }, {
        tag: 'Name',
        color: 'lightblue',
        chekced: false
    }])
    const [text, setText] = useState("This is Test Words. Apple, Banana, Orange and Strawberry are my favorite fruits.");
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({
        x: 0,
        y: 0
    });

    function setTagMap(tag, word, action){
        let words = map.get(tag) || [];

        if(action === 'ADD'){
            words.push(word);
        }else if(action === 'DELETE'){
            words.filter(w => w !== words);
        }

        map.set(tag, words);
        console.log(map)
    }

    function onChange(event) {
        setText(event.target.value);
    }

    function onSelectText(event) {
        const clientRects = window.getSelection().getRangeAt(0).getClientRects()[0];
        setTooltipPosition({x: (clientRects.left+clientRects.right)/2, y: clientRects.bottom})

        const parentNode = window.getSelection().getRangeAt(0).startContainer.parentNode;
        const tagIndex = tags.findIndex(tag => tag.tag === parentNode.id);
        if(tagIndex > -1){
            const newTags = tags.map((tag, index) => index === tagIndex ? {...tag, checked: true} : {...tag, checked: false});
            setTags(newTags);
        }else{
            const newTags = tags.map(tag => {
                tag.checked = false;
                return tag;
            });

            setTags(newTags);
        }

        const selectText = window.getSelection().toString();

        if (selectText.length > 0) {
            setShowTooltip(true);
        }else{
            setShowTooltip(false);
        }
    };

    function taggingWord(tag) {
        const selectText = window.getSelection().toString();

        const parentNode = window.getSelection().getRangeAt(0).startContainer.parentNode;
        const taggedIndex = tags.findIndex(tag => tag.tag === parentNode.id);
        let replace;


        if(taggedIndex > -1){
            replace = parentNode.innerHTML;
            replaceSelection(replace, false);
            setTagMap(tag.tag, selectText, 'DELETE');
        }else{
            replace = document.createElement('span');
            replace.textContent = selectText;
            replace.setAttribute('id', tag.tag);
            replace.style.backgroundColor = tag.color;
            replaceSelection(replace.outerHTML, true);
            setTagMap(tag.tag, selectText, 'ADD');
        }
        setShowTooltip(false);
    }

    function replaceSelection(html, selectInserted) {
        let sel, range, fragment;
        sel = window.getSelection();

        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            console.log(range)
            range.deleteContents();

            if (range.createContextualFragment) {
                fragment = range.createContextualFragment(html);
            } else {
                let div = document.createElement("div"), child;
                div.innerHTML = html;
                fragment = document.createDocumentFragment();
                while ((child = div.firstChild)) {
                    fragment.appendChild(child);
                }
            }            
            if (selectInserted) {
                let firstInsertedNode = fragment.firstChild;
                let lastInsertedNode = fragment.lastChild;
                range.insertNode(fragment);

                if (firstInsertedNode) {
                    range.setStartBefore(firstInsertedNode);
                    range.setEndAfter(lastInsertedNode);
                }
            }else{
                const parentNode = range.startContainer.parentNode; 
                parentNode.parentNode.removeChild(parentNode);
                range.insertNode(fragment);
            }
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    return (
        <div>
            <form action="" method="post" id="wysiwyg" onClick={onSelectText}>
                <div id="input" contentEditable="true" onChange={onChange}>
                    {text}
                </div>
                <textarea name="result" id="result"></textarea>
            </form>
            {
                showTooltip &&
                <Tooltip x={tooltipPosition.x} y={tooltipPosition.y}>
                    <div className="inner">
                        Select Tag Here!<br />
                        {
                            tags.map(item => 
                                <label htmlFor={item.tag}>
                                    <input id={item.tag} type="checkbox" onChange={()=>{taggingWord(item)}} checked={item.checked}/>
                                    {item.tag}
                                </label>)
                        }
                    </div>
                </Tooltip>
            }
        </div>
    )
}

export default WordView;
