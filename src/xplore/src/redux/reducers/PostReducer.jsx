import { GET_POST_BY_USER } from "../types";

export const stateDefault = {
    post: []
};

export const PostReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_POST_BY_USER:{
            return { 
                ...state, 
                post: [...action.post] 
            };
        }
        default:
            return { ...state };
    }
};