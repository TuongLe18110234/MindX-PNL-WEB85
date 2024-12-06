import React, {useContext, useState} from 'react';
import axios from 'axios';
import AppContext from '../../store/AppContext';
import {useHistory } from 'react-router';

import Input from '../UI/Input';
import Card from '../UI/Card';

import classes from './Login.module.css';

const Login = props => {
    const { dispatch } = useContext(AppContext);
    const [userInput, setUserInput] = useState({ email: "", password: ""});
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    const onChangeHandler = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value });
    };

    const onSubmitHandler= async (e) => {
        try{
            e.preventDefault();
            const option = {
                method: "post",
                url: "http://localhost:8080/api/v1/auth/login",
                data: userInput,
            };
            const response = await axios(option);
            const {token, userName, userId} = response.data.data;
            localStorage.setItem("token", token);
            dispatch({type: "CURRENT_USER", payload: { userName, userId }});

            history.push("/");
        } catch (error){
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div className={classes.login}>
            <Card>
                <h3>Enter Your Account</h3>

                {errorMessage &&
                    (Array.isArray(errorMessage) ? (
                        errorMessage.map((err) => (
                            <div className={classes["error-message"]}>Error: {err}</div>
                        ))
                    ) : (
                        <div className={classes["error-message"]}>Error: {errorMessage}</div>
                    ))}

                <form className={classes.form} onSubmit={onSubmitHandler}>
                    <Input input={{
                        id: 'email',
                        type: "email",
                        name: "email",
                        placeholder: "Email",
                        value: userInput.email,
                        onChange: onChangeHandler
                    }} />
                    <Input input={{
                        id: 'password',
                        type: "password",
                        name: "password",
                        placeholder: "Password",
                        value: userInput.password,
                        onChange: onChangeHandler
                    }} />
                    <div className={classes.action}>
                        <button type="submit" className={classes["submit-btn"]}>Login</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Login;