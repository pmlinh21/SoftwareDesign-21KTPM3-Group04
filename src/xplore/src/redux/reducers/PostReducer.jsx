import { GET_ALL_POSTS, GET_TOP_POSTS } from "../types";

export const stateDefault = {
    topPosts: [],
};

export const PostReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_TOP_POSTS: {
            return { ...state, topPosts: action.topPosts };
        }
        default:
            return { ...state };
    }
};