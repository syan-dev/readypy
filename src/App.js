import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Workspace from './components/Workspace/Workspace';
import { loadPyodide } from "pyodide";
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { githubLightInit } from '@uiw/codemirror-theme-github';

function App() {
  const [editorValue, setEditorValue] = useState("");
  const [terminalValue, setTerminalValue] = useState("");
  const [mode, setMode] = useState('dark');
  const [theme, setTheme] = useState(vscodeDarkInit({
    settings: {
      caret: '#c6c6c6',
      fontFamily: '"Menlo", "Monaco", "Consolas", "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
    }
  }));
  const [layout, setLayout] = useState(window.innerWidth < 768 ? 'row' : 'col');
  const [pyodide, setPyodide] = useState(null);

  // Function to initialize Pyodide
  const initializePyodide = async () => {
    console.log('initialize pyodide')
    if (!pyodide) {
      console.log('start loading pyodide');
      const py = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.3/full",
        stdout: (text) => {
          setTerminalValue((prev_text) => prev_text + text + '\n');
        },
        stderr: (text) => {
          setTerminalValue((prev_text) => prev_text + text + '\n');
        },
      });

      const fix = {
        input_fixed: (question) => {
          let answer = prompt(question);
          setTerminalValue((prev_text) => prev_text + question + answer + '\n');
          return answer;
        },
      };

      py.registerJsModule('fix', fix);

      py.runPython(`
        from fix import input_fixed
        input = input_fixed
        __builtins__.input = input_fixed
      `);

      setPyodide(py);
    }
  };

  // Function to run the Python code using Pyodide
  const runCode = () => {
    console.log(pyodide);
    if (pyodide) {
      setTerminalValue("");
      pyodide
        .runPythonAsync(editorValue)
        .then(() => {
          setPyodide(null);
        })
        .catch((err) => {
          var lines = err.message.split("\n");
          let to = 1;
          for (const [i, l] of lines.entries()) {
            if (l.includes('File "<exec>"')) {
              to = i;
              break;
            }
          }
          lines.splice(1, to - 1);
          var newtext = lines.join("\n");
          setTerminalValue(newtext);
          setPyodide(null);
        });
    }
  };

  const clearTerminal = () => {
    setTerminalValue("");
  };

  const handleThemeChange = () => {
    if (mode === 'light') {
      setTheme(vscodeDarkInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: '"Menlo", "Monaco", "Consolas", "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
        }
      }));
      setMode('dark');
    } else {
      setTheme(githubLightInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: '"Menlo", "Monaco", "Consolas", "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
        }
      }));
      setMode('light');
    }
  };

  const handleLayoutChange = () => {
    setLayout((prevLayout) => (prevLayout === 'col' ? 'row' : 'col'));
  };

  // Load Pyodide on page load
  useEffect(() => {
    initializePyodide();
  }, [pyodide]);

  return (
    <div id='app' className={mode}>
      <Header
        runCode={runCode}
        updateCode={setEditorValue}
        handleThemeChange={handleThemeChange}
        handleLayoutChange={handleLayoutChange}
      />
      <Workspace
        theme={theme}
        layout={layout}
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        terminalValue={terminalValue}
        setTerminalValue={setTerminalValue}
        runCode={runCode}
        clearTerminal={clearTerminal}
      />
    </div>
  );
}

export default App;
