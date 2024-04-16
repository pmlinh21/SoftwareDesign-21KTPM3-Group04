import React from "react";
import "./Avatar.css";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.jpg"

export default function Avatar({avatar, size = "big"}) {
    return (
        <img src={avatar || avatarPlaceholder} alt="user's avatar" className= {"avatar-container " + size} />
    )
}
