import React, { useContext, useState } from 'react'
import axios from 'axios';
import AppContext from '../../store/AppContext';
import reactStringReplace from 'react-string-replace';

import classes from './CommentItem.module.css';
import userAvatar from '../../assets/user-circle.png';
import moreImage from '../../assets/more-vert.png';

const CommentItem = props => {
    const comment = props.comment;

    const {dispatch} = useContext(AppContext)
    const [commentToEdit, setCommentToEdit] = useState(comment);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    
    const updateComment = async () => {
        try{
            setOpenEditForm(false);
            const token = localStorage.getItem("token");
            const option = {
                method: "put",
                url: `http://localhost:8080/api/v1/comments/${comment._id}`,
                data: commentToEdit,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios(option);

            console.log("CMT ", commentToEdit);

            dispatch({
                type:  "UPDATE_ONE_COMMENT",
                payload: {...commentToEdit},
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    const deleteComment = async () => {
        try{
            const token = localStorage.getItem("token");
            const option = {
                method: "delete",
                url: `http://localhost:8080/api/v1/comments/${comment._id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios(option);
            dispatch({
                type:  "DELETE_ONE_COMMENT",
                payload: {_id: comment._id},
            });
        } catch (error) {
            console.log(error);
        }
    }

    let date = new Date(comment.createdAt);

    const onOpenMore = () => {
        setOpenEditForm((prevState) => {
          return !prevState;
        });
      };
    
    return (
        <div className={classes["comment-item"]}>
            <div className={classes.avatar}>
                <img src={userAvatar} alt='user-avt' />
            </div>
            <div className={classes.comment}>
                <div className={classes["comment-view"]}>
                    <div className={classes.content}>
                        <div className={classes["user-name"]}>
                            <h6>{comment.author.name}</h6>
                            <p>
                                Date:
                                {" "}
                                {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                            </p>
                        </div>
                        <div className={classes["user-comment"]}>
                            { reactStringReplace(comment.content, '\n', (match, i) => (<br/>)) }
                        </div>
                    </div>
                    {comment.isEditable && (<button className={classes.more} onClick={onOpenMore}>
                        <img src={moreImage} alt='more' />
                    </button>)}
                </div>
                {openEditForm && (
                    <div className={classes["comment-edit"]}>
                        <form className={classes["edit-form"]}>
                            <textarea
                                type="text"
                                name="content"
                                id="content"
                                className="content"
                                placeholder="What's happening?"
                                value={commentToEdit.content}
                                onChange={(e) =>
                                    setCommentToEdit({ ...commentToEdit, content: e.target.value })
                        
                                }
                            ></textarea>
                            <div className={classes["btn-container"]}>
                                {openDeleteConfirm ? (
                                    <>
                                        <p className="delete-question">Are you sure?</p>
                                        <span onClick={() => deleteComment(comment._id)}>Yes</span>
                                        <span onClick={() => setOpenDeleteConfirm(false)}>No</span>
                                    </>
                                ) : (
                                    <>
                                        <span 
                                            onClick={() => updateComment(commentToEdit)}>Update</span>
                                        <span 
                                            onClick={() => setOpenDeleteConfirm(true)}>Delete</span>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;