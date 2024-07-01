import React, { useState, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";
import {handleEditorKeyDown} from '../../utils/utils'
import "./Editor.css";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

//   const handleKeyDown = (event) => {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       const textarea = event.target;
//       const start = textarea.selectionStart;
//       const end = textarea.selectionEnd;

//       const newCode = code.substring(0, start) + "\t" + code.substring(end);
//       setCode(newCode);

//       setTimeout(() => {
//         textarea.selectionStart = textarea.selectionEnd = start + 1;
//       }, 0);
//     } else if (event.key === "Enter") {
//       event.preventDefault();
//       const textarea = event.target;
//       const start = textarea.selectionStart;
//       const end = textarea.selectionEnd;

//       const currentLineStart = code.lastIndexOf("\n", start - 1) + 1;
//       const currentLine = code.substring(currentLineStart, start);

//       const indentMatch = currentLine.match(/^\s*/);
//       const indent = indentMatch ? indentMatch[0] : "";

//       const newCode =
//         code.substring(0, start) + "\n" + indent + code.substring(end);
//       setCode(newCode);

//       setTimeout(() => {
//         textarea.selectionStart = textarea.selectionEnd =
//           start + 1 + indent.length;
//       }, 0);
//     }
//   };

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  return (
    <div className="code-editor-container">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        onKeyDown={(event)=>{handleEditorKeyDown(event, code, setCode)}}
        onScroll={handleScroll}
        spellCheck="false"
        className="code-editor-textarea"
      />
      <Highlight code={code} language="jsx" theme={themes.vsDark}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            ref={preRef}
            className={`code-editor-pre ${className}`}
            style={{ ...style, overflowY: "auto" }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeEditor;
