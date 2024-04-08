import React from "react";
import "./BlogCardNoThumb.css";
import Avatar from "../avatar/Avatar";

export default function BlogCardNoThumb() {
    return (
        <div className="blog-card horizontal no-thumb shadow-sm">
            <div className="top">
                <span className="topic-plain subtitle2">Software design</span>
                <i className="fa-solid fa-bookmark bookmark"></i>
            </div>

            <div className="center title1">Passengers Suffer as Crowded Field Puts Pressure on Europe's Airlines</div>

            <div className="bottom">
                <div className="bottom-left">
                    <Avatar />
                    <div className="info-container">
                        <div className="author-name button3">John Doe</div>
                        <div className="post-info support">
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