import { USER_LOGIN } from "../../util/config";
import { LOGIN, SIGNUP, 
    GET_LIST_BY_USER, ADD_POST_TO_LIST, DELETE_POST_FROM_LIST,
    GET_TOPIC_BY_USER,FOLLOW_TOPIC,UNFOLLOW_TOPIC, 
    GET_AUTHOR_POST, GET_AUTHOR_SUBSCRIBER } from "../types";

let user_login = {};
if(localStorage.getItem(USER_LOGIN)){
    user_login = JSON.parse(localStorage.getItem(USER_LOGIN));
}
 
export const stateDefault = {
    user_login: user_login,
    user_signup: {},
    list: null, 
    topic: null,
    author_post: null,
    author_subscriber: null,
};

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOGIN:{
            return { ...state, user_login: action.user_login };
        }
        case SIGNUP:{
            return { ...state, user_signup: action.formData };
        }
        case GET_LIST_BY_USER:{
            return { ...state, list: action.list}
        }
        case ADD_POST_TO_LIST:{
            const newList = state.list.map(item => {
                if (item.id_list === action.id_list) {
                    const newSavePost = [...item.saved_posts, action.id_post]
                    return {...item, saved_posts: [...newSavePost]}
                }
                return item
            })
            
            return { ...state, list: newList };
        }
        case DELETE_POST_FROM_LIST:{
            const newList = state.list.map(item => {
                if (item.id_list === action.id_list) {
                    const newSavePost = item.saved_posts.filter(
                        id_post => id_post !== action.id_post
                    )
                    return {...item, saved_posts: [...newSavePost]}
                }
                return item
            })
            return { ...state, list: newList}
        }
        case GET_TOPIC_BY_USER:{
            return { ...state, topic: action.topic}
        }
        case FOLLOW_TOPIC:{
            return { ...state, topic: [...state.topic, action.id_topic]}
        }
        case UNFOLLOW_TOPIC:{
            const newTopic = state.topic.filter(
                id_topic => id_topic !== action.id_topic
            )
            return { ...state, topic: [...newTopic]}
        }
        case GET_AUTHOR_POST:{
            return { ...state, author_post: action.author_post}
        }
        case GET_AUTHOR_SUBSCRIBER:{
            return { ...state, author_subscriber: action.author_subscriber}
        }
        default:
            return { ...state };
    }
};