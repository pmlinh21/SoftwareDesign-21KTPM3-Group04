import { GET_ALL_POSTS, GET_TOP_POSTS, GET_POST_BY_USER } from "../types";

export const stateDefault = {
    post: [],
    topPosts: [],
};

export const PostReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_POST_BY_USER:{
            return { 
                ...state, 
                post: [...action.post] 
            };
        }
        case GET_TOP_POSTS: {
            return { ...state, topPosts: action.topPosts };
        }
        default:
            return { ...state };
    }
};