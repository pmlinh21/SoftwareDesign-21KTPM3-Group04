import React from "react";
import { useNavigate,Link } from 'react-router-dom'

import "./BlogCardNoThumb.css";

import Avatar from "../avatar/Avatar";
import BookmarkIcon from "../icon/BookmarkIcon"

import { formartToSQLDatetime, formatToMDY } from '../../util/formatDate'

export default function BlogCardNoThumb(props) {

    const { post, style } = props;

    const navigate = useNavigate();
    const handleBlogCardClicked = () =>{
        navigate("/post?id_post=" + post.id_post)
    }

    return (
            <div className={`d-flex flex-column justify-content-between blog-card p-4 shadow-sm gap-2 ${style ? style : ''}`}
                onClick={handleBlogCardClicked}>
                <div>
                    <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                        <span className="topic-plain subtitle2">{post.list_topic[0]?.topic}</span>
                        <BookmarkIcon id_post={post?.id_post} thumbnail={post.thumbnail}/>
                    </div>

                    <div className="center title2 mt-2 post-title">{post.title}</div>
                </div>

                <div className="d-flex flex-row justify-content-between align-items-center gap-2 mt-1">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                        <Avatar avatar={post.author.avatar} size="small"/>
                        <div className="d-flex flex-column justify-content-between align-items-start ms-2">
                            <div className="author-name button3 mb-1">{post.author.fullname}</div>
                            <div className="post-info support d-flex flex-row gap-2">
                                <span className="date">{formatToMDY(post.publish_time)}</span>
                                <i className="fa-solid fa-message"></i>
                                <span className="comment">{post.responseCount}</span>
                                <i className="fa-solid fa-heart "></i>
                                <span className="likes">{post.likeCount} </span>
                            </div>
                        </div>
                    </div>

                    <div className="bottom-right link-sm">
                        <Link to={`/post?id_post=${post.id_post}`}>
                            Read post<i className="fa-solid fa-arrow-right ms-2"></i>
                        </Link>
                    </div>
                </div>
            </div>
            
    )
}