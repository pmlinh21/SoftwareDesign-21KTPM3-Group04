import { LOGOUT, CREATE_POST, GET_TOP_POSTS, GET_POST_BY_USER, UPDATE_POST } from "../types";

export const stateDefault = {
    posts: null,
    topPosts: null,
};

export const PostReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOGOUT:{
            return stateDefault
        }
        case GET_POST_BY_USER:{
            return { 
                ...state, 
                posts: [...action.posts] 
            };
        }
        case GET_TOP_POSTS: {
            return { ...state, topPosts: action.topPosts };
        }
        case CREATE_POST:{
            return { 
                ...state, 
                posts: [...state.posts, action.newPost] 
            };
        }
        case UPDATE_POST:{
            const newPosts = state.posts.filter(item => item.id_post !== action.updatedPost.id_post)
            return { 
                ...state, 
                posts: [...newPosts, action.updatedPost] 
            };
        }
        default:
            return { ...state };
    }
};