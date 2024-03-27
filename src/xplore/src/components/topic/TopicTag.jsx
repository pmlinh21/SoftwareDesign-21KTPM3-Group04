import React from "react";
import "./TopicTag.css";

export default function TopicTag({topic_name}) {
    return (
        <button className="topic col-auto btn btn-sm rounded-pill bg-neutral-50 title2  text-black">
            {topic_name}
        </button>
    )
}