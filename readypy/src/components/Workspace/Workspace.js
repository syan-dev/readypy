import React from 'react';
import Split from 'react-split-grid';

import Editor from './Editor';
import Terminal from './Terminal';
import classes from './Workspace.module.css';


const Workspace = (props) => {
    return (
        <Split
            render={({
                getGridProps,
                getGutterProps,
            }) => (
                <div 
                    className={`
                        ${classes['grid']}
                        ${props.layout === 'col' ? classes['grid-col'] : classes['grid-row']}
                    `}
                    {...getGridProps()} 
                >
                    <div className={classes.panel} id='editor'>
                        <div className={classes.windowLabelCont}>
                            <div className={classes.windowLabel}>
                                <span>Python</span>
                            </div>
                        </div>
                        <div className={classes.CodeMirror}>
                            <Editor
                                value={props.editorValue}
                                theme={props.theme}
                                setValue={props.setEditorValue}
                            />
                        </div>
                    </div>

                    <div
                        id='split-gutter'
                        className={`
                            ${classes.gutter} 
                            ${props.layout === 'col' ? classes['gutter-col'] : classes['gutter-row']}
                        `}
                        {...(props.layout === 'col' ? getGutterProps('column', 1) : getGutterProps('row', 1))}
                    >
                    </div>

                    <div className={classes.panel} id='terminal'>
                        <div className={classes.windowLabelCont}>
                            <div className={classes.windowLabel}>
                                <span>Shell</span>
                            </div>
                            <div className={classes.windowLabel}>
                                <button onClick={props.clearTerminal}>Clear Terminal</button>
                            </div>
                        </div>
                        <div className={classes.CodeMirror}>
                            <Terminal
                                value={props.terminalValue}
                                theme={props.theme}
                                setValue={props.setTerminalValue}
                                runningState={props.runningState}
                            />
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default Workspace;