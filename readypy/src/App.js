import React from 'react';
import './App.css';
import { listThemes } from './themeConfig';

import Header from './components/Header/Header'
import Workspace from './components/Workspace/Workspace';
import { loadPyodide } from "pyodide";



function App() {
  const [editorValue, setEditorValue] = React.useState("");
  const [terminalValue, setTerminalValue] = React.useState("");
  const [runningState, setRunningState] = React.useState(false);
  const [themeName, setThemeName] = React.useState(Object.keys(listThemes)[0]);
  const [layout, setLayout] = React.useState(window.innerWidth < 768 ? 'row' : 'col');

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

  const handleThemeChange = (event) => {
    setThemeName(event.target.value);
  };

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  return (
    <div id='app' className={listThemes[themeName].className}>
      <Header
        runCode={runCode}
        updateCode={setEditorValue}
        listThemes={listThemes}
        handleThemeChange={handleThemeChange}
        themeNameInit={themeName}
        runningState={runningState}
        handleLayoutChange={handleLayoutChange}
        layoutInit={layout}
      />
      <Workspace
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        terminalValue={terminalValue}
        setTerminalValue={setTerminalValue}
        theme={listThemes[themeName].theme}
        clearTerminal={clearTerminal}
        layout={layout}
      />
    </div>
  );
}

export default App;