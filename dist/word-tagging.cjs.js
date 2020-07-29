'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var styled = _interopDefault(require('styled-components'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nposition: absolute;\nz-index: 2;\ncursor: pointer;\nleft: ", ";\ntop: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var ToolTipContainer = styled.div(_templateObject(), function (props) {
  return props.x ? props.x - 80 + "px" : "50%";
}, function (props) {
  return props.y ? props.y + 5 + "px" : "10%";
});

function TooltipContainer(props) {
  return /*#__PURE__*/React__default.createElement(ToolTipContainer, {
    x: props.x,
    y: props.y
  }, props.children);
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\nmargin-bottom: 5px;\npadding: 7px;\nwidth: 160px;\n-webkit-border-radius: 3px;\n-moz-border-radius: 3px;\nborder-radius: 3px;\nbackground-color: #000;\nbackground-color: hsla(0, 0%, 20%, 0.9);\ncolor: #fff;\ncontent: attr(data-tooltip);\ntext-align: center;\nfont-size: 14px;\nline-height: 1.2;\n&: after{\n    position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -5px;\n  width: 0;\n  border-bottom: 5px solid #000;\n  border-bottom: 5px solid hsla(0, 0%, 20%, 0.9);\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  content: '\u25B2';\n  font-size: 0;\n  line-height: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n  pointer-events: none;\n}\n"], ["\nmargin-bottom: 5px;\npadding: 7px;\nwidth: 160px;\n-webkit-border-radius: 3px;\n-moz-border-radius: 3px;\nborder-radius: 3px;\nbackground-color: #000;\nbackground-color: hsla(0, 0%, 20%, 0.9);\ncolor: #fff;\ncontent: attr(data-tooltip);\ntext-align: center;\nfont-size: 14px;\nline-height: 1.2;\n&: after{\n    position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -5px;\n  width: 0;\n  border-bottom: 5px solid #000;\n  border-bottom: 5px solid hsla(0, 0%, 20%, 0.9);\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  content: '\\u25b2';\n  font-size: 0;\n  line-height: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n  pointer-events: none;\n}\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var DefaultToolTip = styled.div(_templateObject$1());

function DefaultTooltip(props) {
  return /*#__PURE__*/React__default.createElement(DefaultToolTip, null, props.children);
}

function getRandomColor() {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

var Style = {
  input: {
    minHeight: "100px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    padding: "5px",
    marginBottom: "1px"
  },
  textarea: {
    display: "none"
  }
};

function TagEditor(props) {
  var taggedWordsMap = new Map();
  var tagInputRef = React.useRef();

  var _useState = React.useState(props.value || ""),
      _useState2 = _slicedToArray(_useState, 2),
      text = _useState2[0],
      setText = _useState2[1];

  var _useState3 = React.useState(props.tags || []),
      _useState4 = _slicedToArray(_useState3, 2),
      tags = _useState4[0],
      setTags = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showTooltip = _useState6[0],
      setShowTooltip = _useState6[1];

  var _useState7 = React.useState({
    x: 0,
    y: 0
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      tooltipPosition = _useState8[0],
      setTooltipPosition = _useState8[1];

  var CustomTooltip = props.customTooltip;
  React.useEffect(function () {
    if (!props.value) {
      console.warn("TagEditor: need default value");
    }

    if (!props.tags) {
      console.warn("TagEditor: You should give 'tags' value.");
    } else {
      var tempTags = tags.map(function (tag) {
        return {
          name: tag.name,
          color: tag.color ? tag.color : getRandomColor(),
          checked: false
        };
      });
      setTags(tempTags);
    }
  }, []);

  function setTagMap(tag, word, action) {
    var words = taggedWordsMap.get(tag) || [];

    if (action === 'ADD') {
      words.push(word);
    } else if (action === 'DELETE') {
      words = words.filter(function (w) {
        return w !== word;
      });
    }

    taggedWordsMap.set(tag, words);
  }

  function onChange(event) {
    setText(event.target.value);
  }

  function onSelectText(event) {
    var clientRects = window.getSelection().getRangeAt(0).getClientRects()[0];

    if (clientRects) {
      setTooltipPosition({
        x: (clientRects.left + clientRects.right) / 2,
        y: clientRects.bottom
      });
      var parentNode = window.getSelection().getRangeAt(0).startContainer.parentNode;
      var tagIndex = tags.findIndex(function (tag) {
        return tag.name === parentNode.id;
      });

      if (tagIndex > -1) {
        var newTags = tags.map(function (tag, index) {
          return index === tagIndex ? _objectSpread2(_objectSpread2({}, tag), {}, {
            checked: true
          }) : _objectSpread2(_objectSpread2({}, tag), {}, {
            checked: false
          });
        });
        setTags(newTags);
      } else {
        var _newTags = tags.map(function (tag) {
          tag.checked = false;
          return tag;
        });

        setTags(_newTags);
      }

      var selectText = window.getSelection().toString();

      if (selectText.length > 0) {
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    }
  }

  function taggingWord(tag) {
    var selection = window.getSelection();
    var selectText = selection.toString();
    var parentNode = selection.getRangeAt(0).startContainer.parentNode;
    var taggedIndex = tags.findIndex(function (tag) {
      return tag.name === parentNode.id;
    });
    var replace;

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
      var taggedInfo = {
        word: selectText,
        tag: {
          name: tag.name,
          color: tag.color
        },
        tagged: taggedIndex > -1 ? false : true,
        startIndex: 0,
        endIndex: 0,
        html: tagInputRef.current.innerHTML
      };
      props.onChange(taggedInfo);
    }
  }

  function replaceTaggedWord(taggedNode) {
    var replaceText = document.createTextNode(taggedNode.innerHTML);
    taggedNode.parentNode.replaceChild(replaceText, taggedNode);
  }

  function replaceSelection(html, selectInserted) {
    var sel, range, fragment;
    sel = window.getSelection();

    if (sel.getRangeAt && sel.rangeCount) {
      range = window.getSelection().getRangeAt(0);
      range.deleteContents();

      if (range.createContextualFragment) {
        fragment = range.createContextualFragment(html);
      } else {
        var div = document.createElement("div"),
            child;
        div.innerHTML = html;
        fragment = document.createDocumentFragment();

        while (child = div.firstChild) {
          fragment.appendChild(child);
        }
      }

      if (selectInserted) {
        var firstInsertedNode = fragment.firstChild;
        var lastInsertedNode = fragment.lastChild;
        range.insertNode(fragment);

        if (firstInsertedNode) {
          range.setStartBefore(firstInsertedNode);
          range.setEndAfter(lastInsertedNode);
        }
      } else {
        var parentNode = range.startContainer.parentNode;
        parentNode.parentNode.removeChild(parentNode);
        range.insertNode(fragment);
      }

      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  function Tooltip(props) {
    return CustomTooltip ? /*#__PURE__*/React__default.createElement(CustomTooltip, props) : /*#__PURE__*/React__default.createElement(DefaultTooltip, props);
  }

  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("form", {
    className: props.formClassName || "",
    onClick: onSelectText
  }, /*#__PURE__*/React__default.createElement("div", {
    className: props.divClassName || "input",
    style: props.divClassName ? {} : Style.input,
    ref: tagInputRef,
    onChange: onChange,
    contentEditable: true,
    suppressContentEditableWarning: true
  }, text), /*#__PURE__*/React__default.createElement("textarea", {
    className: "wordtag-result",
    style: Style.textarea
  })), showTooltip && /*#__PURE__*/React__default.createElement(TooltipContainer, {
    x: tooltipPosition.x,
    y: tooltipPosition.y
  }, /*#__PURE__*/React__default.createElement(Tooltip, null, tags.map(function (tag, index) {
    return /*#__PURE__*/React__default.createElement("label", {
      key: tag.name + tag.color,
      htmlFor: tag.name,
      className: props.labelClassName || ""
    }, /*#__PURE__*/React__default.createElement("input", {
      id: tag.name + index,
      name: tag.name,
      type: "checkbox",
      className: props.inputClassName || "",
      onChange: function onChange() {
        taggingWord(tag);
      },
      checked: tag.checked
    }), tag.name);
  }))));
}
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
};

exports.DefaultTooltip = DefaultTooltip;
exports.TagEditor = TagEditor;
exports.TooltipContainer = TooltipContainer;
//# sourceMappingURL=word-tagging.cjs.js.map
