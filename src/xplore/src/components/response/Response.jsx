import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Avatar from '../avatar/Avatar'
import { formatToMDY, formartToSQLDatetime } from "../../util/formatDate"
import {postService} from '../../services/PostService'
import "../../styles/commons.css"
import "./Response.css"

// import "./Library.css"

const DropdownMenu = (props) => {
    const {id_user_login, id_author_post, id_author_response, reply, 
        id_response, isReplyDropdown, setLoading,
        setIsEdit, deleteResponse, setIsNewReply, setReportContent} = props
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

    const handleDeleteIcon = async () => {
        try {
            setLoading({
                type: 'full'
            })

            let result;

            if (isReplyDropdown){
                result = await postService.deleteReply(id_response);
            } else{
                result = await postService.deleteResponse(id_response);
            }
            
            toggleDropdown()
            if (result.status === 200){
                deleteResponse(isReplyDropdown, id_response);
            }
            setLoading(null)
        } catch (error) {
            console.log("error", error.response);
        }
    }

    const handleReportIcon = () => {
        setReportContent({
            id_response: id_response,
            isReplyReport: isReplyDropdown
        })
    }

    const handleReplyIcon = () => {
        setIsNewReply((val) => !val)
    }

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }} className="response dropdown">
        <i className="fa-solid fa-ellipsis text-scheme-sub-text" onClick={toggleDropdown} style={{ cursor: 'pointer' }}></i>
        {isOpen && (
            <ul>
                {
                    (id_user_login == id_author_post) && (id_author_response != id_author_post) && (reply == null) && (
                        <li className="button2 text-start d-flex align-items-center py-1" 
                            style={{ margin: '10px 0', cursor: 'pointer' }}
                            onClick={handleReplyIcon}>
                            <i className="me-2 fa-solid fa-reply"></i>Reply</li>
                    )
                } 
                {
                    (id_user_login == id_author_response) ? (
                        <>
                        <li className="button2 text-start d-flex align-items-center py-1" 
                        style={{ margin: '10px 0', cursor: 'pointer' }}
                            onClick={() => {setIsEdit(true)}}>
                            <i className="me-2 fa-solid fa-pen"></i>Edit</li>
                        <li className="button2 text-start d-flex align-items-center py-1" 
                            style={{ margin: '10px 0', cursor: 'pointer' }}
                            onClick={handleDeleteIcon}>
                            <i className="me-2 fa-solid fa-trash"></i>Delete</li>
                        </>
                    ) : (
                        <li className="button2 text-start text-error d-flex align-items-center py-1" 
                            style={{ margin: '10px 0', cursor: 'pointer' }}
                            onClick={handleReportIcon}> 
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
    const {setResponses, deleteResponse, setReportContent, setLoading} = props
    const {id_user, fullname, avatar} = props.author;
    
    const [isEditResponse, setIsEditResponse] = useState(false)
    const [editResponse, setEditResponse] = useState(response);
    const [isEditReply, setIsEditReply] = useState(false)
    const [editReply, setEditReply] = useState(reply);

    const [isNewReply, setIsNewReply] = useState(false);
    const [newReply, setNewReply] = useState("");

    function handleCancelEditResponse(){
        setEditResponse(response)
        setIsEditResponse(false)
    }

    function handleCancelEditReply(){
        setEditReply(reply)
        setIsEditReply(false)
    }

    function handleCancelNewReply(){
        setNewReply("")
        setIsNewReply(false)
    }

    async function handleSaveEditResponse(){
        try{
            setLoading({
                type: 'full'
            })
            const result = await postService.updateResponse({
                id_response: id_response,
                response: editResponse,
                response_time: formartToSQLDatetime(new Date())
            });

            setResponses([...result.data.content]);
            setIsEditResponse(false)
            setLoading(null)
        }catch(e){
            console.log(e)
        }
    }

    async function handleSaveEditReply(){
        try{
            setLoading({
                type: "full"
            })
            const result = await postService.updateReply({
                id_response: id_response,
                reply: editReply,
                reply_time: formartToSQLDatetime(new Date())
            });

            setResponses([...result.data.content]);
            setIsEditReply(false);
            setLoading(null)
        }catch(e){
            console.log(e)
        }
    }

    async function handleSaveNewReply(){
        try{
            setLoading({
                type: "full"
            })
            const result = await postService.replyResponse({
                id_response: id_response,
                reply: newReply,
                reply_time: formartToSQLDatetime(new Date())
            });

            setResponses([...result.data.content]);
            setIsNewReply(false);
            setLoading(null)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div>
            {/* Reader's response */}
            {!isEditResponse ? (
                <>
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

                        setLoading={setLoading}

                        setIsEdit={setIsEditResponse}
                        
                        deleteResponse={deleteResponse}

                        setIsNewReply={setIsNewReply}

                        setReportContent={setReportContent}
                        isReplyDropdown={false}/>
                </div>
            
                <div className='d-flex flex-column'>
                    <p className='p1'>{response}</p>
                </div>
                </>
            ):(
                <div className='col-12 d-flex flex-row gap-3 m-0 mt-3 px-0'>
                    <Avatar avatar={user_login?.avatar} size="small"/>
                    <textarea
                        className="response-textarea"
                        value={editResponse}
                        onChange={(e) => {setEditResponse(e.target.value)}}
                        rows={5}
                        cols={78}
                    />
                    <div style={{width: '104px'}} className="d-flex flex-column justify-content-start gap-1">
                        <button className='sec-btn btn-md py-1' 
                                onClick={handleCancelEditResponse}>Cancel</button>
                        <button className='prim-btn btn-md' 
                            disabled={editResponse == response}
                            onClick={handleSaveEditResponse}>Save</button>
                    </div>
                </div>
            )}

            {/* Author reply */}
            {
                reply && (
                    !isEditReply ? (
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
                                id_response={id_response}
        
                                setIsEdit={setIsEditReply}
                                setLoading={setLoading}

                                deleteResponse={deleteResponse}
                                setReportContent={setReportContent}
                                isReplyDropdown
                            />
                        </div>
                        <div className='d-flex flex-column' style={{ marginLeft: '5rem'}}>
                            <p className='p1'>{reply}</p>
                        </div>
                        </>
                    ):(
                        <div className='col-12 d-flex flex-row gap-3 m-0 mt-3 px-0'>
                            <Avatar avatar={user_login?.avatar} size="small"/>
                            <textarea
                                className="response-textarea"
                                value={editReply}
                                onChange={(e) => {setEditReply(e.target.value)}}
                                rows={5}
                                cols={78}
                            />
                            <div style={{width: '104px'}} className="d-flex flex-column justify-content-start gap-1">
                                <button className='sec-btn btn-md py-1' 
                                        onClick={handleCancelEditReply}>Cancel</button>
                                <button className='prim-btn btn-md' 
                                    disabled={editReply == reply} onClick={handleSaveEditReply}>Save</button>
                            </div>
                        </div>
                    )
                )
            }
            {
                isNewReply && (
                    <div className='col-12 d-flex flex-row gap-3 m-0 mt-3 px-0'>
                        <Avatar avatar={user_login?.avatar} size="small"/>
                        <textarea
                            className="response-textarea"
                            value={newReply}
                            onChange={(e) => {setNewReply(e.target.value)}}
                            rows={5}
                            cols={78}
                        />
                        <div style={{width: '104px'}} className="d-flex flex-column justify-content-start gap-1">
                            <button className='sec-btn btn-md py-1' 
                                    onClick={handleCancelNewReply}>Cancel</button>
                            <button className='prim-btn btn-md' 
                                disabled={newReply == ""} onClick={handleSaveNewReply}>Save</button>
                        </div>
                    </div>
                )
                
            }
        </div> 
    )
}