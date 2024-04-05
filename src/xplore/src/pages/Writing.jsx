import React, { useState, useEffect, useRef } from 'react';
import "../styles/commons.css";
import "./Writing.css";
import Navbar from '../components/navbar/Navbar';
import TextEditor from './TextEditor';
import {Link, useNavigate } from 'react-router-dom'

function Toolbar() {
    // declare button
    return (
        <div className="container toolbar">
            <div className="col-12 m-0 p-0 d-flex justify-content-between align-items-center">
                <Link to="#" onClick={() => window.history.back()} className='text-black link-sm'>
                    <i className="text-black fa-solid fa-arrow-left"></i>
                    &nbsp;Back
                </Link>
                <div className="col-auto">
                    <button className="link-nm rounded-1 button2 bg-white text-scheme-sub-text border-left">
                        Save
                    </button>
                    <button className="link-nm rounded-1 button2 bg-white text-scheme-sub-text border-left">
                        Preview
                    </button>
                    <button className="prim-btn rounded-1 button2">
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Writing() {
    const [content, setContent] = useState("You can create a simple event bus that allows components to subscribe to and emit events. When the backend response is received, emit an event containing the response data, and the components interested in that data can subscribe to the event.")
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState([])

    const tmp = ""
    // console.log(content)
    return (
        <div className="writing-page">
            {/* <Navbar /> */}
            <Toolbar />
            <div className="container col-12 mt-3">
                <TextEditor content={content} setContent={setContent}></TextEditor>
            </div>
        </div>
    );
}
