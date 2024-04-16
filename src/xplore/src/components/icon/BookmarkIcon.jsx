import React from "react";
import { useState } from "react";
import './BookmarkIcon.css';

export default function BookmarkIcon({id_post, is_saved}){
    const [displayPopup, setDisplayPopup] = useState(false)

    function handleBookmarkClick(){
        console.log(id_post)
        setDisplayPopup(true)
    }

    const icon_color = is_saved ? 'text-scheme-primary' : 'text-scheme-sub-text'

    return(
        <button className="bookmard-icon btn position-absolute" onClick={handleBookmarkClick}>
            <i className={`${icon_color} fa-solid fa-bookmark h-100`} ></i>
        </button>

    )
}