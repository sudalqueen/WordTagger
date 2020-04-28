import React, {useState} from 'react';
import '../style/Word.css';

function WordView() {
    const [text, setText] = useState("This is Test Words. Apple, Banana, Orange and Strawberry are my favorite fruits.");
    const [showText, setShowText] = useState(text);

    let startIndex = 0;

    function DetectSelectWord() {
        const selector = window.getSelection();
        const extraText = text.replace(selector.anchorNode.textContent, '');
        const baseText = selector.anchorNode.textContent;
        console.log(selector.baseNode.textContent);
        console.log(selector.anchorNode.textContent)
        console.log(selector.focusNode.textContent)
        console.log(selector.extentNode.textContent);
        // console.log(extraText);
        // console.log(baseText);
        const tagged = `<span id="word">${selector.toString()}</span>`;
        const taggedText = baseText.slice(0, startIndex + selector.anchorOffset) + tagged + baseText.slice(startIndex + selector.focusOffset);
        startIndex = selector.anchorOffset;
        setText(extraText + taggedText);
        setShowText(extraText + taggedText);
    }

    return (
        <div onClick={DetectSelectWord}>
            <p dangerouslySetInnerHTML={{__html: showText}}></p>
            <p>{text}</p>
        </div>
    )
}

export default WordView;
