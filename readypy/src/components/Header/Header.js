import React from "react";

import classes from "./Header.module.css";
import LogoIcon from "../Icon/Logo";

const Header = (props) => {
    return (
        <div className={classes.header}>
            <h1>
                <span className={classes.logo}><LogoIcon size={15} color="darkcyan" /></span>
                <span className={classes.title}>ReadyPy</span>
            </h1>
            <div className={classes.actions}>
                <nav className={classes.actionCont}>
                    <div className={classes.actionItem}>
                        <button onClick={props.handleLayoutChange}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0,2.3C0,1,0.9,0,2,0h12c1.1,0,2,1,2,2.3v11.4c0,1.3-0.9,2.3-2,2.3H2c-1.1,0-2-1-2-2.3V2.3z M8.5,1.1v13.7H14 c0.6,0,1-0.5,1-1.1V2.3c0-0.6-0.4-1.1-1-1.1H8.5z M7.5,1.1H2c-0.6,0-1,0.5-1,1.1v11.4c0,0.6,0.4,1.1,1,1.1h5.5V1.1z"/>
                            </svg>
                            Layout
                        </button>
                    </div>
                    <div className={classes.actionItem}>
                        <button onClick={props.handleThemeChange}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                            </svg>
                            Mode
                        </button>
                    </div>
                    <div className={classes.actionItem}>
                        <button onClick={props.runCode}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13,8L2.7,2v12L13,8z M14.4,6.8c0.7,0.4,0.9,1.3,0.5,1.9c-0.1,0.2-0.3,0.4-0.5,0.5L3.1,15.8c-0.9,0.5-2.2-0.1-2.2-1.2V1.4 c0-1.2,1.3-1.8,2.2-1.2L14.4,6.8z"/>
                            </svg>
                            Run
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;