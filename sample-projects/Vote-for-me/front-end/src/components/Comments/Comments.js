import React, {useCallback, useContext, useEffect} from 'react';
import axios from "axios";
import AppContext from '../../store/AppContext';

import Card from "../UI/Card";
import CommentItem from './CommentItem';
import WriteComment from './WriteComment';

import classes from './Comments.module.css';

const Comments = () => {
    const { state, dispatch } = useContext(AppContext);
    const { comments, user, post } = state;

    const getAllComments = useCallback(async () => {
        try {
            const option = {
                method: "get",
                url: `http://localhost:8080/api/v1/posts/${post.id}`,
            }
            const response = await axios(option);
            const comments = response.data.data.comments;

            dispatch({ type: "GET_ALL_COMMENTS", payload: comments});
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, post.id]);

    useEffect(() => {
        getAllComments()
    }, [getAllComments])

    const newComments = comments.map((comment) => {
        if (user) {
            return comment.author._id === user.userId
                ? { ...comment, isEditable: true }
                : comment
        } else {
            return { ...comment, isEditable: false}
        }
    });

    const commentsList = newComments.map(comment => (
        <CommentItem comment={comment} key={comment._id} />
    ));

    return (
        <section className={classes.comments}>
            <Card isTransparent="true" >
                <h3>Place your comments here!</h3>
                <div className={classes.line}></div>
                <WriteComment />
                <div className={classes["comment-items"]}>
                    { commentsList }
                </div>
            </Card>
        </section>
    )
}

export default Comments;
