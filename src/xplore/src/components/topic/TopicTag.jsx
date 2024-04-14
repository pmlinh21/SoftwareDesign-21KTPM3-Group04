import React from "react";
import "./TopicTag.css";

function capitalizeFirstLetter(str) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
  }
  

export default function TopicTag({topic}) {
    return (
        <button className="topic col-auto btn btn-sm rounded-pill bg-neutral-50 title2  text-black">
            {capitalizeFirstLetter(topic)}
        </button>
    )
}