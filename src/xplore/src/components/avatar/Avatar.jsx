import React from "react";
import "./avatar.css";

export default function Avatar({avatar, size = "big"}) {

    avatar = "https://picsum.photos/id/2/600/600"

    return (
        <img src={avatar || "../../assets/images/avatar-placeholder.png"} alt="user's avatar" className= {"avatar-container " + size} />
    )
}
