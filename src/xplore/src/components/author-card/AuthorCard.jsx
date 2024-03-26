import React from "react";
import "./AuthorCard.css";

export default function AuthorCard() {

  const user = {
    name: "John Doe",
    bio: "I'm a software engineer",
    photo: "https://picsum.photos/id/2/820/1000"
  }

  return (
    <div className="author-card">
      <img src={user.photo || "../../assets/images/avatar-placeholder.jpg"} alt="user's photo" className="photo" />
      <div className="info">
        <div className="name title1">{user.name}</div>
        <div className="bio p3">{user.bio}</div>
      </div>
    </div>
  )
}