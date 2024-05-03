import React from "react";
import "./ListCard.css";

export default function ListCard(props) {
    const {list, author, style} = props;

    return (
        <div className={`list-card p-4 shadow half ${style}`}>
            <div className='d-flex flex-column justify-content-between info-list'>
                <div className="d-flex flex-column justify-content-start">
                    <div className="d-flex flex-row justify-content-start">
                        <img src={author?.avatar || "./imgs/avatar-placeholder.jpg"} alt="user's avatar" className="avatar" />
                        <p className="p1 user-name ms-1">{author?.fullname || "Fullname"}</p>
                    </div>
                    <h6 className="text-scheme-main-text">{list?.list_name || "List name"}</h6>
                </div>

                <div className="d-flex flex-row align-items-center">
                    <p className="p1 post-count my-auto">{list?.saved_posts?.length || "000"} posts</p>
                    <i className="fa-regular fa-share-from-square ms-3 ic mt-1"></i>
                </div>
            </div>

            <div className="thumbnail-container">
                <img src={list.saved_posts[0]?.thumbnail || './imgs/avatar-placeholder.jpg'} alt="post thumbnail" className="first" />
                <img src={list.saved_posts[1]?.thumbnail || './imgs/avatar-placeholder.jpg'} alt="post thumbnail" className="second" />
                <img src={list.saved_posts[2]?.thumbnail || './imgs/avatar-placeholder.jpg'} alt="post thumbnail" className="third" />
            </div>
        </div>
        
    )
}