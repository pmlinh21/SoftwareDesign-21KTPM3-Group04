import React from "react";
import "./Button3.css";

export default function Button3({text}) {
    return (
        <button className="px-3 py-2 tert-btn button3 rounded-pill text-scheme-sub-text border-scheme-sub-text">
            {text}
        </button>
    )
}