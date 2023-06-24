import React, { useState } from 'react';
import './App.css';

import Header from './components/Header/Header'
import Workspace from './components/Workspace/Workspace';
import { loadPyodide } from "pyodide";
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { githubLightInit } from '@uiw/codemirror-theme-github';


function App() {
  const vscodeDark = vscodeDarkInit({
    settings: {
      caret: '#c6c6c6',
      fontFamily: '"Menlo", "Monaco", "Consolas", "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
    }
  });

  const githubLight = githubLightInit({
    settings: {
      caret: '#c6c6c6',
      fontFamily: '"Menlo", "Monaco", "Consolas", "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
    }
  });

  const [editorValue, setEditorValue] = useState("");
  const [terminalValue, setTerminalValue] = useState("");
  const [runningState, setRunningState] = useState(false);
  const [mode, setMode] = useState('dark');
  const [theme, setTheme] = useState(vscodeDark);
  const [layout, setLayout] = useState(window.innerWidth < 768 ? 'row' : 'col');

  const runCode = () => {

    setTerminalValue("Running Code ...\n");

    loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.3/full",
      stdout: (text) => {
        setTerminalValue((prev_text) => {
          return prev_text + text + '\n';
        });
      },
      stderr: (text) => {
        setTerminalValue((prev_text) => {
          return prev_text + text + '\n';
        });
      },
    }).then((pyodide) => {
      setTerminalValue("");

      const fix = {input_fixed : (question) => {
        let answer = prompt(question);
        setTerminalValue((prev_text) => {
          return prev_text + question + answer + '\n';
        });
        return answer
      }};

      pyodide.registerJsModule('fix', fix)
    
      pyodide.runPython(`
        from fix import input_fixed
        input = input_fixed
        __builtins__.input = input_fixed
      `);

      setRunningState(true);

      pyodide
      .runPythonAsync(editorValue)
      .then(() => {
        setRunningState(false);
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
          setRunningState(false);
      });
    });
  };

  const clearTerminal = () => {
    setTerminalValue("");
  };

  const handleThemeChange = () => {
    if (mode === 'light') {
      setTheme(vscodeDark);
      setMode('dark');
    } else {
      setTheme(githubLight);
      setMode('light');
    }
  };

  const handleLayoutChange = () => {
    setLayout((prevLayout) => (prevLayout === 'col' ? 'row' : 'col'));
  };

  return (
    <div id='app' className={mode}>
      <Header
        runCode={runCode}
        updateCode={setEditorValue}
        handleThemeChange={handleThemeChange}
        runningState={runningState}
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