import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { keymap } from "@codemirror/view";
import { defaultKeymap } from '@codemirror/commands';



const styleTheme = EditorView.baseTheme({
    '&.cm-editor.cm-focused': {
        outline: '0px',
    }
});


const Editor = (props) => {
    const onChange = useCallback((value, viewUpdate) => {
        props.setValue(value);
    }, []);

    return (
        <CodeMirror
            value={props.value}
            height="100%"
            placeholder="Write your Python code here..."
            basicSetup={{
                defaultKeymap: false
            }}
            extensions={[
                python(),
                EditorView.lineWrapping,
                styleTheme,
                keymap.of([
                    {
                        key: 'Shift-Enter',
                        preventDefault: true,
                        run() {
                            props.runCode();
                        },
                    },
                    ...defaultKeymap, // add in all of the default keymappings from codemirror
                ])
            ]}
            onChange={onChange}
            theme={props.theme}
        />
    );
};

export default Editor;