import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';


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
            placeholder="Welcome to ReadyPy. Write your Python code here..."
            extensions={[
                python(),
                EditorView.lineWrapping,
                styleTheme
            ]}
            onChange={onChange}
            theme={props.theme}
        />
    );
};

export default Editor;