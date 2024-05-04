import { LOGOUT, HIDE_LOADING, DISPLAY_LOADING } from "../types";

export const stateDefault = {
    loading: false
};

export const LoadingReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case HIDE_LOADING:{
            return { 
                ...state, 
                loading: false
            };
        }
        case DISPLAY_LOADING:{
            return { 
                ...state, 
                loading: true
            };
        }
        case LOGOUT:{
            return stateDefault;
        }
        default:
            return { ...state };
    }
};