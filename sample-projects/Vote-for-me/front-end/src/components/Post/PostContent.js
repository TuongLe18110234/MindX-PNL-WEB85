import React from 'react';
import Card from "../UI/Card";

import classes from "./PostContent.module.css"

function PostContent() {
    return (
        <section className={classes["post-content"]}>
            <Card>
                <div className={classes.content}>
                    <h5>Group 30</h5>
                    <h3>TOPIC: Persisting Data with MongoDB by NodeJS</h3>
                    <h5>Main content:</h5>
                    <ul>
                        <li>General introduction about NoSQL, MongoDB Database, and MongoDB UI Tools</li>
                        <li>Built a website "Vote For Me" using MERN STACK with Mongoose and Expressjs Framework</li>
                    </ul>
                    <h5>Link documents:</h5>
                    <ul>
                        <li>Documentations about this topic: <a target="_blank" href="https://drive.google.com/drive/folders/1wI725QaJ4SuTLFwsDzw-fhnxNpfaqFar?usp=sharing">Click here</a></li>
                        <li>Presentation video about this topic: <a target="_blank" href="https://youtu.be/PF89ecPH69c" rel="noreferrer">Click here</a></li>
                    </ul>
                </div>    
            </Card>
        </section>
    )
}

export default PostContent
