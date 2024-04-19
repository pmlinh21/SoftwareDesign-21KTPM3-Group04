import React from "react";
import "./ListCard.css";

import { Link } from "react-router-dom";

export default function ListCard(props) {
    const {author, listName, postCount} = props;
    return (
        <div className="list-card p-4 shadow row">
            <div className="d-flex flex-column justify-content-between info me-3">
                <div className="d-flex flex-column justify-content-start">
                    <div className="d-flex flex-row justify-content-start">
                        <img src={author?.avatar || "./imgs/avatar-placeholder.jpg"} alt="user's avatar" className="avatar" />
                        <p className="p1 user-name ms-1">{author?.fullname || "Fullname"}</p>
                    </div>
                    <h6 className="text-scheme-main-text">{listName || "List name"}</h6>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <p className="p1 post-count my-auto">{postCount || "000"} posts</p>
                    <div className="d-flex flex-row justify-content-end align-items-center">
                        <i class="fa-regular fa-bookmark me-2 ic"></i>
                        <i class="fa-regular fa-share-from-square me-2 ic"></i>
                        <span className="dropdown dropend">
                            <i class="fa-solid fa-ellipsis-vertical ic" role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" href="#">Edit list</Link></li>
                                <li><Link class="dropdown-item" href="#">Pin list</Link></li>
                                <li><Link class="dropdown-item" href="#">Share list</Link></li>
                                <li><hr className="dropdown-divider" ></hr></li>
                                <li>
                                    <Link class="dropdown-item delete-dropdown" href="#">
                                        <i class="fa-regular fa-trash-can"></i> Delete list
                                    </Link>
                                </li>

                            </ul>
                        </span>
                    </div>
                </div>
                
            </div>
            <div className="thumbnail-container">
                <img src="https://picsum.photos/id/2/600/800" alt="post thumbnail" className="first" />
                <img src="https://picsum.photos/id/2/600/600" alt="post thumbnail" className="second" />
                <img src="https://picsum.photos/id/2/600/600" alt="post thumbnail" className="third" />
            </div>
        </div>
    )
}