import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import './BookmarkIcon.css';

import {getListByUserAction, createListAction, addPostToListAction, deletePostFromListAction} from '../../redux/actions/UserAction'
import {LoginPopup} from '../../pages/LoginPopup'
import Loading from '../system-feedback/Loading'

function BookmarkModal(props) {
    const {id_post, list,loading, id_user ,
        handleBookmarkClick, handleListClick,
        newListName, setNewListName, handleCreateList} = props
    const handleOverlayClick = (e) => {
        e.stopPropagation(); 
    };

    const handleChangeNewListName = (e) => {
        setNewListName(e.target.value);
    }

    console.log(newListName)

    return (
        <div className="bookmark-modal-overlay" onClick={handleOverlayClick}>
            <div className="bookmark-modal">
                {loading && <Loading/>}
                <i className="fa-solid fa-xmark close-button" onClick={handleBookmarkClick}></i>
                {!loading && !id_user && (
                    <p className="title1 m-0">
                        You need to login to save this post
                    </p>
                )} 
                {!loading && id_user && (
                <>
                    <p className="title1">
                        Select List
                    </p>
                    <div className="form-group">
                        <label className="label2">New list</label>
                        <div className="d-flex">
                            <input type="text" name="list_name" value={newListName} onChange={handleChangeNewListName}/>
                            <button className="prim-btn rounded-1 button2 px-3 ms-3"
                                onClick={handleCreateList} disabled={newListName.length == 0} >
                                Create
                            </button>
                        </div>
                    </div>
                    {
                        (list?.length > 0) ? (
                            list?.map((item) => {
                                const saved_posts = item.saved_posts?.map((item) => item.id_post) || [];
                                console.log(saved_posts);
                                return(
                                    <div className="form-row" key={item.id_list}>
                                        <div className="checkbox d-flex align-items-center">
                                            <input type="checkbox" id="list" defaultChecked ={saved_posts.includes(id_post)} 
                                                onChange={(e)=>{handleListClick(e,item.id_list,e.target.checked)}}/>
                                            <p className="list p2 m-0 ms-3">{item.list_name}</p>
                                        </div>
                                    </div>
                                )
                            })
                        ): (
                            <p className="p2 text-center text-scheme-sub-text">You haven't created any lists</p>
                        )
                        
                    }
                </>
                )}
            </div>
        </div>
    );
};

export default function BookmarkIcon({id_post, set_absolute, regular_icon, thumbnail}){
    const dispatch = useDispatch()
    const {user_login, list} = useSelector(state => state.UserReducer)
    const {loading} =  useSelector(state => state.LoadingReducer)
    const [displayPopup, setDisplayPopup] = useState(false)
    function handleBookmarkClick(e){
        e.stopPropagation();
            setDisplayPopup((val) => !val)
    }

    useEffect(()=> {
        if (list == null && user_login?.id_user){
            dispatch(getListByUserAction(user_login?.id_user))
        }
    }, [])

    function handleListClick(e,id_list, is_saved){
        e.stopPropagation();
        if (is_saved){
            dispatch(addPostToListAction(id_list, id_post,thumbnail))
        } else{
            dispatch(deletePostFromListAction(id_list, id_post))
        }
    }

    const [newListName, setNewListName] = useState('')
    async function handleCreateList(){
        dispatch(createListAction({
            id_user: user_login.id_user,
            list_name: newListName
        }))
        setNewListName('')
    }

    const is_saved = list?.find(item => {
        const saved_posts = item.saved_posts?.map((item) => item.id_post) || []; 
        return saved_posts.includes(id_post)
    })
    const icon_color = is_saved ? 'text-scheme-primary' : 'text-scheme-sub-text'
    const icon_type = (regular_icon && !is_saved) ? 'fa-regular': 'fa-solid' 
    const is_absolute = set_absolute ? 'position-absolute' : ''
    return(
        <>
            { displayPopup && 
                <BookmarkModal 
                    id_post={id_post}
                    id_user={user_login?.id_user}
                    loading={loading}
                    list={list}
                    handleBookmarkClick={handleBookmarkClick}
                    handleListClick={handleListClick}
                    newListName={newListName}
                    setNewListName={setNewListName}
                    handleCreateList={handleCreateList}/>
            }
            <button className={`${is_absolute} bookmard-icon btn`} onClick={handleBookmarkClick}>
                <i className={`${icon_color} ${icon_type} fa-bookmark h-100`} 
                    style={{fontSize: '20px'}}></i>
            </button>
        </>
    )
}