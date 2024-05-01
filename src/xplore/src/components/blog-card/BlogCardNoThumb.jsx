import React from "react";
import { useNavigate } from 'react-router-dom'

import "./BlogCardNoThumb.css";

import Avatar from "../avatar/Avatar";
import BookmarkIcon from "../icon/BookmarkIcon"

export default function BlogCardNoThumb(props) {
    const { id_post, title, content, publish_time, thumbnail, likeCount, responseCount } = props.post;

    const navigate = useNavigate();
    const handleBlogCardClicked = () =>{
        navigate("/post?id_post=" + id_post)
    }

    return (
            <div className="d-flex flex-column justify-content-between blog-card p-4 shadow-sm gap-2"
                onClick={handleBlogCardClicked}>
                <div>
                    <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                        <span className="topic-plain subtitle2">Post Topic</span>
                        <BookmarkIcon id_post={id_post}/>
                    </div>

                    <div className="center title1 mt-2">{title}</div>
                </div>

                <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                        <Avatar size="small"/>
                        <div className="d-flex flex-column justify-content-between align-items-start gap-1 ms-2">
                            <div className="author-name button3">Post's Author</div>
                            <div className="post-info support d-flex flex-row gap-1">
                                <span className="date">Aug 6</span>
                                <i className="fa-solid fa-message"></i>
                                <span className="comment">12</span>
                                <i className="fa-solid fa-heart "></i>
                                <span className="likes">30</span>
                            </div>
                        </div>
                    </div>

                    <div className="bottom-right link-sm">
                        Read post<i className="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>
            
    )
}