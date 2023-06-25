import React from 'react';
import classes from './Logo.module.css';



const LogoIcon = (props) => {
    const size = props.size;
    const space = props.size/10;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size*3 + space*2} height={size*2 + space} className={classes.logo}>
            <rect 
                x={size + space} y="0" 
                width={size} height={size} 
                // fill={color} 
            />
            <rect 
                x={(size) * 2 + space * 2} y="0" 
                width={size} height={size} 
                // fill={color} 
            />
            <rect 
                x="0"
                y={size + space}
                width={size} 
                height={size} 
                // fill={color} 
            />
            <rect 
                x={size + space} 
                y={size + space} 
                width={size} 
                height={size} 
                // fill={color} 
            />
        </svg>
    );
};

export default LogoIcon;