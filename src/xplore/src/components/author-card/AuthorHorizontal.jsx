import React from "react";
import "./AuthorHorizontal.css";
import Avatar from "../avatar/Avatar";
import Button3 from "../button/Button3";

export default function AuthorHorizontal({name, description, avatar, isSubscribe = true}) {

    name = "John Doe"
    description = "John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe" 

    return (
        <div className="author-horizontal row bg-white rounded-3 shadow-sm py-3 gap-0 px-2">
            <div className=" col-2 d-flex align-items-start px-0 ps-1">
                <Avatar avatar={avatar} size="small"/>
            </div>

            <div className=" col-6 d-flex flex-wrap px-0 ">
                <p className="button2 m-0">{name}</p>
                <div className="p3 m-0 mt-2 long-text text-scheme-sub-text">{description}</div>
            </div>

            <div className=" col-4 d-flex align-items-center px-0">
                    <Button3 text={isSubscribe ? "Unsubscribe" : "Subscribe"}/>
            </div>
        </div>
    )
}