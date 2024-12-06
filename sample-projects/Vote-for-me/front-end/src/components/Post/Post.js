import React from "react";
import Votes from "../Votes/Votes";
import PostContent from "./PostContent";
import Comments from "../Comments/Comments";

import classes from './Post.module.css';

const Post = props => {
    return (
        <div className={classes.post}>
            <PostContent></PostContent>
            <Votes></Votes>
            <Comments></Comments>
        </div>
    )
}

export default Post;