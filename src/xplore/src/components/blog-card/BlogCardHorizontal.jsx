import React from "react";
import "./BlogCardHorizontal.css";
import Avatar from "../avatar/Avatar";

const LONG_PASSAGE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."

export default function BlogCardHorizontal(props) {
    const {id_post, title, content, thumbnail, firstTopic, author_name, author_avatar,
    publish_date, response, like} = props;


    return (
        <div className="blog-card-horizontal rounded-3 shadow-sm container d-flex bg-white">
            <div className="col-12 d-flex py-3 px-2">
                <div className="col-5 thumbnail-container bg-white">
                    <img src={thumbnail || "https://picsum.photos/id/2/600/600"} alt=""  />
                </div>
 
                <div className="col-7 ps-4">
                    <div className="d-flex justify-content-between ">
                        <p className="subtitle2 text-scheme-primary">
                            {firstTopic?.toUpperCase() || "FIRST TOPIC"}
                        </p>
                        <i className="text-scheme-sub-text fa-solid fa-bookmark"></i>
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

                    <div className=" d-flex align-items-center pe-0 pt-2">
                        <div className="col-9 d-flex align-items-center gap-2">
                            <div className="col-2">
                                <Avatar avatar={author_avatar} size="small"/>
                            </div>

                            <div className="col-10 row d-flex align-items-center ">
                                <p className="title2 text-black mb-2">
                                    {author_name || "Author name"}
                                </p>
                                <div className="d-flex gap-2 text-scheme-sub-text align-items-center">
                                    <p className="support mb-0">
                                        {publish_date || "Aug 6"}
                                    </p>
                                    <p className="support mb-0">
                                        <i className="fa-solid fa-message"></i>
                                    </p>
                                    <p className="support mb-0">
                                        {response || "000"}
                                    </p>
                                    <p className="support mb-0">
                                        <i className="fa-solid fa-heart"></i>
                                    </p>
                                    <p className="support mb-0">
                                        {like || "000"}
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