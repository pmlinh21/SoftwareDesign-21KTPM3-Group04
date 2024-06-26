import React from "react";
import "./BlogCardHorizontal.css";
import "./ProfileCard.css";
import Avatar from "../avatar/Avatar";
import { formatToMD } from "../../util/formatDate";


const LONG_PASSAGE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."

export default function ProfileCard(props) {
    const {id_post, title, content, thumbnail, list_topic, author,
        publish_time, responseCount, likeCount, is_saved} = props;


    return (
        <div className="blog-card-horizontal rounded-3 shadow-sm container d-flex bg-white">
            <div className="col-12 d-flex py-3 px-2">
                <div className="col-5 thumbnail-container bg-white h-100">
                    <img src={thumbnail || "https://picsum.photos/id/2/600/600"} alt=""  />
                </div>
 
                <div className="col-7 ps-4 d-flex flex-column justify-content-between">
                    <div className="post-info-block">
                        <div className="d-flex justify-content-between align-items-center">
                            {
                                list_topic && list_topic?.length > 0 &&
                                (
                                    <p className="subtitle2 text-scheme-primary p-0 m-0">
                                        {`${list_topic[0]?.topic?.toUpperCase()}` || "FIRST TOPIC"}
                                    </p>
                                )
                            }
                            <div className="dropdown">
                                <i className="fa-solid fa-ellipsis" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                </i>

                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                                    <li><a className="dropdown-item" href="#">Edit post</a></li>
                                    <li><a className="dropdown-item" href="#">Pin post</a></li>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Stats</a></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><a className="dropdown-item delete-dropdown" href="#">
                                        <i className="fa-regular fa-trash-can"></i> Delete Post
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="pt-2 mb-0">
                            <p className="title1 text-black title-text long-text">
                                {title || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                            </p>
                        </div>

                        <div className="pt-0 mt-0">
                            <p className="p3 text-scheme-sub-text long-text content-text">
                                {content || LONG_PASSAGE}
                            </p>
                        </div>
                    </div>
                    
                    <div className=" d-flex align-items-center pe-0 pt-2">
                        <div className="col-9 d-flex align-items-center gap-2">
                            <div className="col-2">
                                <Avatar avatar={author?.avatar} size="small"/>
                            </div>

                            <div className="col-10 row d-flex align-items-center ">
                                <p className="title3 text-black mb-2">
                                    {author?.fullname || "Author name"}
                                </p>
                                <div className="d-flex gap-2 text-scheme-sub-text align-items-center">
                                    <p className="support mb-0">
                                        {(publish_time && formatToMD(publish_time)) || "Aug 6"}
                                    </p>
                                    <p className="support mb-0">
                                        <i className="fa-solid fa-message"></i>
                                    </p>
                                    <p className="support mb-0">
                                        {responseCount || "000"}
                                    </p>
                                    <p className="support mb-0">
                                        <i className="fa-solid fa-heart"></i>
                                    </p>
                                    <p className="support mb-0">
                                        {likeCount || "000"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-4 link-sm">
                            <a href={`/post?id_post=${id_post}`}>Read post <i className="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}