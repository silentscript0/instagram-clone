import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/statis/images/avatar/1.jpg"
                />
                <h4>{username}</h4>
            </div>
        
                <img className="post__image" src={imageUrl} alt="" />
                
                <h5 className="post__text"><strong>{username}</strong> {caption}</h5>
                
        </div>
    )
}

export default Post;