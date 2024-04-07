import React from "react";
import "./AuthorVertical.css";

export default function AuthorVertical() {

    // const { author } = props;


  const author = {
    fullname: "John Doe",
    bio: "I'm a software engineer",
    avatar: "https://res.cloudinary.com/dklt21uks/image/upload/v1707242646/xplore/hgaazvbsjbm9tpp2wvdx.jpg"
  }

  return (
    <div className="author-card">
      <img src={author.avatar} className="photo" />
      <div className="info-container">
        <div className="name title1">{author.fullname}</div>
        <div className="bio p3">{author.bio}</div>
      </div>
    </div>
  )
}