import { LOGOUT, GET_ALL_TOPICS } from "../types";

let stateDefault = {
    topics: null,
};

export const TopicReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_TOPICS: {
            return { ...state, topics: action.topics };
        }
        case LOGOUT:{
            return stateDefault
        }
        default:
            return { ...state };
    }
}