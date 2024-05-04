import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'

import {postService} from '../../services/PostService';
// import {getListByUserAction, addPostToListAction, deletePostFromListAction} from '../../redux/actions/PostAction'

export default function LikeIcon({id_user, setGuestPopup, id_post, likeCount, setLikeCount}){
    const {user_login} = useSelector(state => state.UserReducer)
    
    const [isLike, setIsLike] = useState(false)

    useEffect(() => {
        const fetchLike = async () => {
            try {
                const like = await postService.getLikeOfPost(id_post, user_login.id_user);
                setIsLike(like.data.content)
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        
        if (id_user != null)
            fetchLike();
    }, []);

    async function handleLikeClick(){
        if (id_user == null){
            setGuestPopup(true)
            return
        }
        if (isLike){
            setIsLike(false)
            setLikeCount((val) => val - 1)
            await postService.unlikePost(id_post, user_login.id_user)
            
        } else{
            setIsLike(true)
            setLikeCount((val) => val + 1)
            await postService.likePost({id_post:id_post, id_user: user_login.id_user})
        }
        
    }

    const icon_classname = isLike ? 'fa-solid text-error' : 'fa-regular'
    return(
        <>
            <button id='like-btn' className="d-flex align-items-center">
                <i className={`${icon_classname} fa-heart me-1`} 
                    style={{fontSize: '20px'}}
                    onClick={handleLikeClick}></i> 
                {likeCount}
            </button>
        </>
    )
}