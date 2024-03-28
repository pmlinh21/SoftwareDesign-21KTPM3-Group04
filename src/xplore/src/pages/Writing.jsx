import React, { useState, useEffect, useRef } from 'react';
import "../styles/commons.css";
import "./Writing.css";
import Navbar from '../components/navbar/Navbar';
import TextEditor from './TextEditor';

function Toolbar() {
    return (
        <div className="container toolbar">
            <div className="col-12 m-0 p-0 d-flex justify-content-between align-items-center">
                <a href={`#`} className='text-black link-sm'>
                    <i className="text-black fa-solid fa-arrow-left"></i>
                    &nbsp;Back
                </a>
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

    return (
        <div className="writing-page">
            <Navbar />
            <Toolbar />
            <div className="container col-12 mt-3">
                <TextEditor></TextEditor>
            </div>
        </div>
    );
}
