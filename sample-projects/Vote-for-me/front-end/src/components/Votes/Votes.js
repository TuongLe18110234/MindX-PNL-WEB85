import React, { useContext, useCallback, useEffect } from 'react';
import {Link} from "react-router-dom";
import AppContext from '../../store/AppContext';
import Card from '../UI/Card';
import VoteItem from './VoteItem';
import axios from "axios";

import classes from "./Votes.module.css";

function Votes() {
    const { state, dispatch } = useContext(AppContext);
    const { post, user } = state;

    const getAllVotes = useCallback(async () => {
        try {
            const option = {
                method: "get",
                url: `http://localhost:8080/api/v1/posts/${post.id}`,
            }
            const response = await axios(option);
            const votes = response.data.data.post.votes;

            dispatch({ type: "GET_ALL_VOTES", payload: votes});
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, post]);

    useEffect(() => {
        getAllVotes()
    }, [getAllVotes])

    return (
        <section className={classes.votes}>
            <Card isTransparent="true" >
                <h3>What do you think about that?</h3>
                <div className={classes.line}></div>
                {!user && (<div className={classes.notification}>
                    Please login to vote for me! 
                    <Link to='/login'>Login now</Link> or <Link to='/register'>Register new account</Link>
                </div>)}
                <VoteItem id="good-vote" status="good" />
                <VoteItem id="fine-vote" status="fine" />
                <VoteItem id="bad-vote" status="bad" />
            </Card>
        </section>
    )
}

export default Votes;
