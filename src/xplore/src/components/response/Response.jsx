import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Avatar from '../avatar/Avatar'
import { formatToMDY } from "../../util/formatDate"
import {postService} from '../../services/PostService'
import "../../styles/commons.css"
import "./Response.css"

// import "./Library.css"

const DropdownMenu = (props) => {
    const {id_user_login, id_author_post, id_author_response, reply, id_response, deleteResponse} = props
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);  
          }
        };
    
        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen]);

    const toggleDropdown = () => setIsOpen((val) => !val);

    const handleDeleteResponse = async () => {
        try {
            const result = await postService.deleteResponse(id_response);
            toggleDropdown()
            if (result.status === 200){
                deleteResponse(id_response);
            }
        } catch (error) {
            console.log("error", error.response);
        }
    }

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }} className="response dropdown">
        <i className="fa-solid fa-ellipsis text-scheme-sub-text" onClick={toggleDropdown} style={{ cursor: 'pointer' }}></i>
        {isOpen && (
            <ul style={{
            position: 'absolute',
            listStyleType: 'none',
            paddingLeft: '10px',
            paddingRight: '10px',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginTop: '5px',
            zIndex: 100 // Make sure dropdown is on top of other elements
            }}>
                {
                    (id_user_login == id_author_post) && (id_author_response != id_author_post) && (reply == null) && (
                        <li className="button2 text-start d-flex align-items-center py-1" style={{ margin: '10px 0', cursor: 'pointer' }}>
                            <i className="me-2 fa-solid fa-reply"></i>Reply</li>
                    )
                } 
                {
                    (id_user_login == id_author_response) ? (
                        <>
                        <li className="button2 text-start d-flex align-items-center py-1" style={{ margin: '10px 0', cursor: 'pointer' }}>
                            <i className="me-2 fa-solid fa-pen"></i>Edit</li>
                        <li className="button2 text-start d-flex align-items-center py-1" 
                            style={{ margin: '10px 0', cursor: 'pointer' }}
                            onClick={handleDeleteResponse}>
                            <i className="me-2 fa-solid fa-trash"></i>Delete</li>
                        </>
                    ) : (
                        <li className="button2 text-start text-error d-flex align-items-center py-1" style={{ margin: '10px 0', cursor: 'pointer' }}> 
                            <i className="me-2 fa-solid fa-flag"></i> Report</li>
                    )
                }             
            </ul>
        )}
    </div>
    )
}

export default function Response(props) {
    const {user_login} = useSelector(state => state.UserReducer);
    const {user, response, response_time, reply, reply_time, id_response} = props.response;
    const {id_user, fullname, avatar} = props.author;

    return (
        <div>
            {/* Reader's response */}

            <div className='col-12 d-flex justify-content-between align-items-center my-4'>
                <div className='d-flex gap-2 align-items-center'>
                    <Avatar avatar={user?.avatar} size="small"/>
                    <p className='button2 m-0'>{user?.fullname || "Author name"}</p>
                    <p className='p2 m-0' style={{ color: 'var(--scheme-sub-text)'}}>{(response_time && formatToMDY(response_time)) || "MMM DD"}</p>
                </div>
                <DropdownMenu
                    id_user_login={user_login?.id_user}
                    id_author_post={id_user}
                    id_author_response={user?.id_user}
                    reply={reply}
                    id_response={id_response}
                    deleteResponse={props.deleteResponse}/>
            </div>
            <div className='d-flex flex-column'>
                <p className='p1'>{response}</p>
            </div>

            {/* Author reply */}

            {
                reply && (
                    <>
                    <div className='d-flex justify-content-between align-items-center my-4' style={{ marginLeft: '5rem'}}>
                        <div className='d-flex gap-2 align-items-center'>
                            <Avatar avatar={avatar} size="small"/>
                            <p className='button2 m-0'>{fullname || "Author name"}</p>
                            <p className='p2 m-0' style={{ color: 'var(--scheme-sub-text)'}}>{(reply_time && formatToMDY(reply_time)) || "MMM DD, YYYY"}</p>
                        </div>
                        <DropdownMenu
                            id_user_login={user_login?.id_user}
                            id_author_post={id_user}
                            id_author_response={id_user}
                        />
                    </div>
                    <div className='d-flex flex-column' style={{ marginLeft: '5rem'}}>
                        <p className='p1'>{reply}</p>
                    </div>
                    </>
                )
            }
        </div> 
    )
}