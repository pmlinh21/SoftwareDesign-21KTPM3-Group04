import React from "react";
import "./Avatar.css";

export default function Avatar() {

    const user = {
        avatar: "https://picsum.photos/id/2/600/600"
    }

    return (
        <img src={user.avatar || "../../assets/images/avatar-placeholder.png"} alt="user's avatar" className="avatar" />
    )
}
