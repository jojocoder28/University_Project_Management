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

const CodeEditor = ({ fileBlob, className }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    if (fileBlob) {
      const reader = new FileReader();
      reader.onload = () => setCode(reader.result);
      reader.readAsText(fileBlob);
    }
  }, [fileBlob]);

  return (
    <div className={`CodeMirror-container ${className} w-full`}>
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
        }}
      />
    </div>
  );
};

export default CodeEditor;
