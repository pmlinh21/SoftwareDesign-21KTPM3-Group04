import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import './BookmarkIcon.css';

import {getListByUserAction, addPostToListAction, deletePostFromListAction} from '../../redux/actions/UserAction'

import Loading from '../loading/Loading'

function BookmarkModal({id_post, list,loading, handleBookmarkClick, handleListClick}) {

    return (
        <div className="bookmark-modal-overlay">
            <div className="bookmark-modal">
                {loading ?
                    <Loading/>
                : <>
                    <i className="fa-solid fa-xmark close-button" onClick={handleBookmarkClick}></i>
                
                    <p className="title1">
                        Select List
                    </p>

                    {
                        list?.map((item) => {
                            console.log(id_post)
                            console.log(item.saved_posts.includes(id_post))
                            return(
                                <div className="form-row" key={item.id_list}>
                                    <div className="checkbox d-flex align-items-center">
                                        <input type="checkbox" id="list" checked={item.saved_posts.includes(id_post)} 
                                            onChange={(e)=>{handleListClick(item.id_list,e.target.checked)}}/>
                                        <p className="list p2 m-0 ms-3">{item.list_name}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
                }
                
            </div>
        </div>
    );
};

export default function BookmarkIcon({id_post, set_absolute}){
    const dispatch = useDispatch()
    const {user_login, list} = useSelector(state => state.UserReducer)
    const {loading} =  useSelector(state => state.LoadingReducer)

    const [displayPopup, setDisplayPopup] = useState(false)
    function handleBookmarkClick(){
        setDisplayPopup((val) => !val)
    }

    useEffect(()=> {
        if (list == null){
            dispatch(getListByUserAction(user_login?.id_user))
        }
    }, [])

    function handleListClick(id_list, is_saved){
        if (is_saved){
            dispatch(addPostToListAction(id_list, id_post))
        } else{
            dispatch(deletePostFromListAction(id_list, id_post))
        }
    }

    const is_saved = list?.find(item => item.saved_posts.includes(id_post))
    const icon_color = is_saved ? 'text-scheme-primary' : 'text-scheme-sub-text'
    const is_absolute = set_absolute ? 'position-absolute' : ''

    return(
        <>
            { displayPopup && 
                <BookmarkModal 
                    id_post={id_post}
                    loading={loading}
                    list={list}
                    handleBookmarkClick={handleBookmarkClick}
                    handleListClick={handleListClick}/>
            }
            <button className={`${is_absolute} bookmard-icon btn`} onClick={handleBookmarkClick}>
                <i className={`${icon_color} fa-solid fa-bookmark h-100`} ></i>
            </button>
        </>
    )
}