import React,{ useState, useEffect, useRef } from 'react';

import TooltipContainer from './Tooltip/TooltipContainer';
import DefaultTooltip from './Tooltip/DefaultToolTip';

import { getRandomColor } from '../utils';

import '../style/Word.css';

function TagEditor(props) {
    const taggedWordsMap = new Map();
    const tagInputRef = useRef();
    const [text, setText] = useState(props.value || "");
    const [tags, setTags] = useState(props.tags || []);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({
        x: 0,
        y: 0
    });
    const CustomTooltip = props.customTooltip;

    useEffect(() => {
        if (!props.value) {
            console.warn("TagEditor: need default value");
        };
        if (!props.tags) {
            console.warn("TagEditor: You should give 'tags' value.")
        } else {
            const tempTags = tags.map(tag => {
                return {
                    name: tag.name,
                    color: tag.color ? tag.color : getRandomColor(),
                    checked: false
                }
            });

            setTags(tempTags);
        }
    }, []);

    function setTagMap(tag, word, action) {
        let words = taggedWordsMap.get(tag) || [];

        if (action === 'ADD') {
            words.push(word);
        } else if (action === 'DELETE') {
            words = words.filter(w => w !== word);
        }

        taggedWordsMap.set(tag, words);
    }

    function onChange(event) {
        setText(event.target.value);
    }

    function onSelectText(event) {
        const clientRects = window.getSelection().getRangeAt(0).getClientRects()[0];

        if (clientRects) {
            setTooltipPosition({ x: (clientRects.left + clientRects.right) / 2, y: clientRects.bottom })

            const parentNode = window.getSelection().getRangeAt(0).startContainer.parentNode;
            const tagIndex = tags.findIndex(tag => tag.name === parentNode.id);
            if (tagIndex > -1) {
                const newTags = tags.map((tag, index) => index === tagIndex ? { ...tag, checked: true } : { ...tag, checked: false });
                setTags(newTags);
            } else {
                const newTags = tags.map(tag => {
                    tag.checked = false;
                    return tag;
                });

                setTags(newTags);
            }

            const selectText = window.getSelection().toString();

            if (selectText.length > 0) {
                setShowTooltip(true);
            } else {
                setShowTooltip(false);
            }
        }
    };

    function taggingWord(tag) {
        console.log(window.getSelection().getRangeAt(0))
        const selectText = window.getSelection().toString();

        const parentNode = window.getSelection().getRangeAt(0).startContainer.parentNode;
        const taggedIndex = tags.findIndex(tag => tag.name === parentNode.id);
        let replace;


        if (taggedIndex > -1) {
            replace = parentNode.innerHTML;
            replaceSelection(replace, false);
            setTagMap(tag.name, selectText, 'DELETE');
        } else {
            replace = document.createElement('span');
            replace.textContent = selectText;
            replace.setAttribute('id', tag.name);
            replace.style.backgroundColor = tag.color;
            replaceSelection(replace.outerHTML, true);
            setTagMap(tag.name, selectText, 'ADD');
        }
        setShowTooltip(false);

        if (props.onClickTag) {
            props.onClickTag(selectText, tag.name, taggedIndex > -1 ? false : true);
        }
        if (props.onChange) {
            const taggedInfo = {
                word: selectText,
                tag: {
                    name: tag.name,
                    color: tag.color
                },
                tagged: taggedIndex > -1 ? false : true,
                startIndex: 0,
                endIndex: 0,
                html: tagInputRef.current.innerHTML
            }
            props.onChange(taggedInfo)
        }
    }

    function replaceSelection(html, selectInserted) {
        let sel, range, fragment;
        sel = window.getSelection();

        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
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
            } else {
                const parentNode = range.startContainer.parentNode;
                parentNode.parentNode.removeChild(parentNode);
                range.insertNode(fragment);
            }
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    function Tooltip(props) {
        return CustomTooltip ? <CustomTooltip {...props}/> : <DefaultTooltip {...props}/>;
    }

    return (
        <div>
            <form id="wysiwyg" onClick={onSelectText}>
                <div id="input" ref={tagInputRef} onChange={onChange} contentEditable suppressContentEditableWarning>
                    {text}
                </div>
                <textarea id="result" name="result"></textarea>
            </form>
            {
                showTooltip &&
                <TooltipContainer x={tooltipPosition.x} y={tooltipPosition.y}>
                    <Tooltip>
                        {
                            tags.map(tag =>
                                <label key={tag.name + tag.color} htmlFor={tag.name}>
                                    <input id={tag.name} type="checkbox" onChange={() => { taggingWord(tag) }} checked={tag.checked} />
                                    {tag.name}
                                </label>)
                        }
                    </Tooltip>
                </TooltipContainer>
            }
        </div>
    )
};

export default TagEditor;