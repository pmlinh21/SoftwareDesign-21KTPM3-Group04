import React from "react";
import { useNavigate } from 'react-router-dom'

import "./ResponseCard.css";
import { formatToMDY } from "../../util/formatDate";
import { postService } from "../../services/PostService";

export default function ResponseCard(props) {

    const { response, style } = props;
    
    const user_info = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
    
    const navigate = useNavigate();

    const handleResponseClicked = () => {
        navigate("/post?id_post=" + response?.id_post)
    }

    const deleteResponse = async () => {
        try {
            const result = await postService.deleteResponse(response.id_response);
            if (result.status === 200) {
                //refresh page
                alert("Response deleted successfully");
            }
        } 
        catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className={`response-card d-flex flex-column bg-white justify-content-between p-4 shadow mb-3 ${style}`} >
            <p className="p3 text-scheme-sub-text mb-3">On <b>{response?.id_post_post?.title || "---"}</b> by <b>{response?.id_post_post?.author?.fullname || "---"}</b></p>
            <p className="title2 m-0 p-0 text-scheme-main-text content" onClick={handleResponseClicked}>{response?.response || "---"}</p>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <p className="p3 text-scheme-sub-text p-0 m-0">{formatToMDY(response?.response_time) || "---"}</p>
                <div className="dropdown dropend">
                    <i class="fa-solid fa-ellipsis-vertical ic" role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item" onClick={handleResponseClicked}>Edit</li>
                        <li><hr className="dropdown-divider" ></hr></li>
                        <li class="dropdown-item delete-dropdown" onClick={deleteResponse}>
                            <i class="fa-regular fa-trash-can"></i> Delete
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}