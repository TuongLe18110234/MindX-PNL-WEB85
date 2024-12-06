import React from 'react'

import classes from './Button.module.css'

const Button = (props) => {
    const btnClasses = `${classes.button} ${classes[props.status]} ${props.isActive ? classes.active : ''}`;

    return (
        <div className={btnClasses} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default Button
