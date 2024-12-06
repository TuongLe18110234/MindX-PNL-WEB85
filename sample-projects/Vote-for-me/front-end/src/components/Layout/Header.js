import React, { useContext } from "react";
import {Link} from "react-router-dom";

import AppContext from '../../store/AppContext';

import classes from './Header.module.css'

const Header = props => {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    
    const signOut = () => {
        localStorage.removeItem("token");
        dispatch({ type: "CURRENT_USER", payload: null });
    };

    return (
        <div className={classes.header}>
            <div className={classes.content}>
                <h1>
                    <Link to='/'>
                        Vote For Me!
                    </Link>
                </h1>
                <div className={classes["main-nav"]}>
                    { user ? (
                        <>
                            <div className={classes['user-name']}>
                                Hello, { user.userName }
                            </div>
                            <div className={classes['sign-out']} onClick={signOut}>
                                Sign out
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={classes.login}>
                                <Link to='/login'>Login</Link>
                            </div>
                            <div className={classes.register}>
                                <Link to='/register'>Register</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;