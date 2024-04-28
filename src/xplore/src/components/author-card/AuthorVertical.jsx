import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthorVertical.css";

export default function AuthorVertical(props) {
    const navigate = useNavigate();

    const { id_user, avatar, bio, fullname } = props.author;

    const handleAuthorClick = () => {
        navigate("/author-profile", { state: { author: props.author } });
    };

    return (
        <div className="author-card" onClick={handleAuthorClick}>
            <img src={avatar} className="photo" />
            <div className="info-container">
                <div className="name title1">{fullname}</div>
                <div className="bio p3">{bio}</div>
            </div>
        </div>
    )
}