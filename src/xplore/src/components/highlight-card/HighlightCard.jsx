import React from "react";
import { useNavigate } from 'react-router-dom'

import "./HighlightCard.css";
import { formatToMDY } from "../../util/formatDate";
import { postService } from "../../services/PostService";

export default function HighlightCard(props) {
    /*
    {
      "id_highlight": 5,
      "id_post": 1,
      "start_index": 162,
      "end_index": 187,
      "content": "ens and social media on o",
      "highlight_time": "2024-05-01T20:32:04.000Z",
      "id_post_post": {
        "title": "An Open Letter to Parents: We Need to Get Our Kids Off the Screens",
        "author": {
          "fullname": "Pham Mai"
        }
      }
     */
    const { highlight, style } = props;
    
    const user_info = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
    
    const navigate = useNavigate();

    const handleHighlightClicked = () => {
        navigate(`/post?id_post=${highlight?.id_post}#response-section`)
    }

    const deleteHighlight = async () => {
        try {
            const result = await postService.deleteHighlight({ start_index: highlight.start_index, end_index: highlight.end_index, id_user: user_info.id_user, id_post: highlight.id_post});
            if (result.status === 200) {
                //refresh page
                alert("Highlight deleted successfully");
                
            }
        } 
        catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className={`highlight-card d-flex flex-column bg-white justify-content-between p-4 shadow mb-3 ${style}`} >
            <p className="p3 text-scheme-sub-text mb-3">From <b>{highlight?.id_post_post?.title || "---"}</b> by <b>{highlight?.id_post_post?.author?.fullname || "---"}</b></p>
            <p className="title2 m-0 p-0 text-scheme-main-text content" onClick={handleHighlightClicked}><mark>{highlight?.content || "---"}</mark></p>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <p className="p3 text-scheme-sub-text p-0 m-0">{formatToMDY(highlight?.highlight_time) || "---"}</p>
                <div className="dropdown dropend">
                    <i className="fa-solid fa-ellipsis-vertical ic" role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item" onClick={handleHighlightClicked}>Edit</li>
                        <li><hr className="dropdown-divider" ></hr></li>
                        <li className="dropdown-item delete-dropdown" onClick={deleteHighlight}>
                            <i className="fa-regular fa-trash-can"></i> Delete
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}