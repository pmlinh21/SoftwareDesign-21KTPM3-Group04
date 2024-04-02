import React from "react";
import "./BlogPostCard.css";
import Avatar from "../avatar/Avatar";

const LONG_PASSAGE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."

export default function BlogPostCard(props) {
    const {id_post, title, content, thumbnail, firstTopic, author_name, author_avatar,
    publish_date, response, like} = props;

    

    return (
        <div className="blog-post-card col d-flex flex-wrap bg-white p-0">

            <div className="col-12 thumbnail-container bg-white p-0 m-0 position-relative">
                <i className="text-scheme-sub-text fa-solid fa-bookmark position-absolute"></i>
                <img src={thumbnail || "https://picsum.photos/id/2/600/600"} alt=""  />
            </div>
            
            <div className="row col-12 m-0 mt-4">
                <p className="col-auto title3 text-black m-0 p-2 rounded-1 bg-blue-100">
                    {firstTopic|| "First topic"}
                </p>
            </div>

            <div className="row col-12 m-0 mt-2">
                <h6 className="col-auto text-black m-0 p-0 title-text long-text">
                    {title || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </h6>
            </div>

            <div className="row col-12 m-0 mt-2 mb-3">
                <p className="col-auto p3 text-scheme-sub-text m-0 p-0 content-text long-text">
                    {content || LONG_PASSAGE}
                </p>
            </div>
 
            <div className="row col-12 d-flex align-items-center justify-content-between p-0 m-0">
                <div className="col-8 d-flex align-items-center gap-2 p-0">
                    <div className="col-3">
                        <Avatar avatar={author_avatar} size="small"/>
                    </div>

                    <div className="col-9 row d-flex flex-column align-items-start gap-1 ">
                        <p className="col-auto title2 text-black m-0 p-0">
                            {author_name || "Author name"}
                        </p>
                        <p className="col-auto support text-scheme-sub-text m-0 p-0">
                            {publish_date || "Aug 6, 2024"}
                        </p>
                    </div>
                </div>

                <div className="col-4 link-sm m-0 p-0 d-flex justify-content-end">
                    <a href={`/post?id_post=${id_post}`}>Read post <i className="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    )
}