import { USER_LOGIN } from "../../util/config";
import { LOGIN, SIGNUP, LOGOUT,
    GET_LIST_BY_USER, ADD_POST_TO_LIST, DELETE_POST_FROM_LIST,
    GET_TOPIC_BY_USER,FOLLOW_TOPIC,UNFOLLOW_TOPIC, 
    GET_AUTHOR_POST, GET_AUTHOR_SUBSCRIBER, GET_AUTHOR_LIST, IS_FOLLOW_AUTHOR,
    BLOCK_AUTHOR, CREATE_LIST, GET_USER_FOLLOWER, GET_USER_FOLLOW, GET_USER_BLOCK, UNBLOCK_USER, PIN_POST, UNPIN_POST, 
    UPDATE_USER_DETAIL, GET_INVISIBLE_USERS,
    UPDATE_USER_PROFILE, GET_USER_CURRENT_SUBSCRIPTION,
    CANCEL_PLAN} from "../types";

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
    author_list: null,
    is_follow: false,
    block: null, // chỉ chứa id_user
    user_follower: null,
    user_follow: null,
    user_block: null,
    user_current_subscription: {},
    user_invisible: null
};

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOGIN:{
            return { ...state, user_login: action.user_login };
        }
        case SIGNUP:{
            return { ...state, user_signup: action.formData };
        }
        case LOGOUT:{
            return stateDefault
        }
        case GET_LIST_BY_USER:{
            return { ...state, list: action.list}
        }
        case CREATE_LIST:{
            const newList = (state.list == null) ? [action.list] : [...state.list,action.list];

            return { ...state, list: newList}
        }
        case ADD_POST_TO_LIST:{
            const newList = state.list.map(item => {
                if (item.id_list === action.id_list) {
                    const newSavePost = [...item.saved_posts, { 
                        id_post: action.id_post,
                        thumbnail: action.thumbnail
                    }]
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
                        post => post.id_post !== action.id_post
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
        case GET_AUTHOR_LIST:{
            return { ...state, author_list: action.author_list}
        }
        case IS_FOLLOW_AUTHOR:{
            return { ...state, is_follow: action.is_follow}
        }
        case BLOCK_AUTHOR:{
            if(state.block){
                return { ...state, block: [...state.block, action.block]}
            }
            else{
                return { ...state, block: [action.block]}
            }
            
        }
        case GET_INVISIBLE_USERS:{
            return { ...state, user_invisible: [...action.user_invisible]}
        }
        case GET_USER_FOLLOWER:{
            return { ...state, user_follower: action.user_follower}
        }
        case GET_USER_FOLLOW:{
            return { ...state, user_follow: action.user_follow}
        }
        case GET_USER_BLOCK:{
            return { ...state, user_block: action.user_block}
        }
        case UNBLOCK_USER:{
            if(state.block){
                const updatedBlock = state.block.filter(item => item !== action.block);
                return { ...state, block: updatedBlock };
            }
        }
        case PIN_POST:{
            return { ...state, user_login: action.user_login };
        }
        case UPDATE_USER_DETAIL:{
            return { ...state, user_login: action.user_login };
        }
        case UPDATE_USER_PROFILE:{
            return { ...state, user_login: action.user_login };
        }
        case UNPIN_POST:{
            return { ...state, user_login: action.user_login };
        }
        case GET_USER_CURRENT_SUBSCRIPTION:{
            return { ...state, user_current_subscription: action.user_current_subscription };
        }
        case CANCEL_PLAN:{
            return { ...state, user_login: action.user_login };
        }
        default:
            return { ...state };
    }
};