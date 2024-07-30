import React, { useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'; 
import 'codemirror/theme/material.css';
import 'codemirror/theme/neo.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/darcula.css';
import '../App.css';
import { FaRegEdit } from 'react-icons/fa';
import { CiRead } from "react-icons/ci";

const CodeEditor = ({ fileBlob, className, readmode }) => {
  const [code, setCode] = useState('');
  const [readOnly, setReadOnly] = useState(true); // State to manage read-only mode

  useEffect(() => {
    if (fileBlob) {
      const reader = new FileReader();
      reader.onload = () => setCode(reader.result);
      reader.readAsText(fileBlob);
    }
  }, [fileBlob]);

  const toggleEditMode = () => {
    setReadOnly(prevReadOnly => !prevReadOnly); // Toggle read-only state
  };

  return (
    <>
    { !readmode ? (
      
      <><div className={`CodeMirror-container ${className} w-full`}>
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true,
            readOnly: true,
            lineWrapping: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          } } />
    </div>
    </>
    ):(
      <><button onClick={toggleEditMode} className="btn h-9 w-12 text-sm overflow-hidden">
        {readOnly ? <FaRegEdit /> : <CiRead />}
      </button>
      <div className={`CodeMirror-container ${className} w-full`}>
          <CodeMirror
            value={code}
            options={{
              mode: 'javascript',
              theme: 'dracula', // Ensure the theme is correctly set
              lineNumbers: true,
              readOnly: readOnly ? 'nocursor' : false, // Set readOnly based on state
              lineWrapping: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setCode(value);
            } } />
        </div>
        </>
    )}
      
    </>
    );
};

export default CodeEditor;
