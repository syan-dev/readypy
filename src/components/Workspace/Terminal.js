import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { ViewPlugin, EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { StreamLanguage } from '@codemirror/language';
import { shell } from '@codemirror/legacy-modes/mode/shell';


const Terminal = (props) => {

    const scrollBottom = ViewPlugin.fromClass(
        class {
            update(update) {
                if (update.docChanged) {
                    update.view.scrollDOM.scrollTop = update.view.scrollDOM.scrollHeight;
                }
            }
        }
    );

    return (
        <CodeMirror
            // value={props.value}
            value={props.runningState ? 'Running code...' : props.value}
            height="100%"
            basicSetup={{
                lineNumbers: false,
                highlightActiveLine: false,
                highlightActiveLineGutter: false
            }}
            extensions={[
                StreamLanguage.define(shell),
                EditorView.lineWrapping,
                EditorView.editable.of(false),
                EditorState.readOnly.of(true),
                scrollBottom
            ]}
            theme={props.theme}
        />
    );
};

export default Terminal;