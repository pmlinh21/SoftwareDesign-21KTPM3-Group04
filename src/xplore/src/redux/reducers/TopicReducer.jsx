import { GET_ALL_TOPICS, GET_TOPIC_BY_ID } from "../types";

let stateDefault = {
    topics: null,
};

export const TopicReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_TOPICS: {
            return { ...state, topics: action.topics };
        }
        // case GET_TOPIC_BY_ID: {
        //     return { ...state, topicDetail: action.topicDetail };
        // }
        default:
            return { ...state };
    }
}