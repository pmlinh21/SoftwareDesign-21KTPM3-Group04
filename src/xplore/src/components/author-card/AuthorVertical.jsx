import React from "react";
import "./AuthorVertical.css";

export default function AuthorVertical(props) {

    const { id_user, avatar, bio, fullname } = props.author;
    
    return (
        <div className="author-card">
            <img src={avatar} className="photo" />
            <div className="info-container">
                <div className="name title1">{fullname}</div>
                <div className="bio p3">{bio}</div>
            </div>
        </div>
    )
}