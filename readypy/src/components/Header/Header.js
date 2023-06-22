import React from "react";

import classes from "./Header.module.css";

const Header = (props) => {
    return (
        <div className={classes.header}>
            <h1>READYPY</h1>
            <button onClick={props.runCode} disabled={props.runningState}>RUN</button>
            <select id="layout-select" onChange={props.handleLayoutChange} value={props.layoutInit}>
                <option value="row">Horizontal</option>
                <option value="col">Vertical</option>
            </select>
            <select id="theme-select" onChange={props.handleThemeChange} value={props.themeNameInit}>
                {Object.keys(props.listThemes).map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Header;