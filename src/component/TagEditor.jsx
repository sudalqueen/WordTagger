import React,{ useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import TooltipContainer from './Tooltip/TooltipContainer.jsx';
import DefaultTooltip from './Tooltip/DefaultToolTip.jsx';

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
        const selection = window.getSelection();
        const selectText = selection.toString();

        const parentNode = selection.getRangeAt(0).startContainer.parentNode;
        const taggedIndex = tags.findIndex(tag => tag.name === parentNode.id);
        let replace;


        if (taggedIndex > -1) {
            replaceTaggedWord(parentNode);
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

    function replaceTaggedWord(taggedNode) {
        const replaceText = document.createTextNode(taggedNode.innerHTML);
        taggedNode.parentNode.replaceChild(replaceText, taggedNode);
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
            <form className={props.formClassName || ""} onClick={onSelectText}>
                <div className={props.divClassName || "input"} ref={tagInputRef} onChange={onChange} contentEditable suppressContentEditableWarning>
                    {text}
                </div>
                <textarea className="wordtag-result"></textarea>
            </form>
            {
                showTooltip &&
                <TooltipContainer x={tooltipPosition.x} y={tooltipPosition.y}>
                    <Tooltip>
                        {
                            tags.map((tag, index) =>
                                <label key={tag.name + tag.color} htmlFor={tag.name} className={props.labelClassName || ""}>
                                    <input id={tag.name + index} name={tag.name} type="checkbox" className={props.inputClassName || ""} onChange={() => { taggingWord(tag) }} checked={tag.checked} />
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

TagEditor.propTypes = {
    value: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    formClassName: PropTypes.string,
    divClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    customTooltip: PropTypes.elementType,
    onChange: PropTypes.func,
    onClickTag: PropTypes.func
}