import React from "react";
import { useState } from "react";

export default function BookmarkIcon({id_post}){
    const [displayPopup, setDisplayPopup] = useState(false)

    function handleBookmarkClick(){
        console.log(id_post)
        setDisplayPopup(true)
    }

    return(
        <button className="btn position-absolute" onClick={handleBookmarkClick}>
            <i className="text-scheme-sub-text fa-solid fa-bookmark "></i>
        </button>

    )
}