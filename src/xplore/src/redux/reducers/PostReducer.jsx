import { CREATE_POST, GET_TOP_POSTS, GET_POST_BY_USER } from "../types";

export const stateDefault = {
    posts: null,
    topPosts: [],
};

export const PostReducer = (state = stateDefault, action) => {
    switch (action.type) {
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
        default:
            return { ...state };
    }
};