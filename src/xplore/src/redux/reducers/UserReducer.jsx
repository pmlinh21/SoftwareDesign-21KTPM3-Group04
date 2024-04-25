import { USER_LOGIN } from "../../util/config";
import { LOGIN, SIGNUP, GET_USER_BY_EMAIL, 
    GET_LIST_BY_USER, ADD_POST_TO_LIST, DELETE_POST_FROM_LIST } from "../types";

let user_login = {};
if(localStorage.getItem(USER_LOGIN)){
    user_login = JSON.parse(localStorage.getItem(USER_LOGIN));
}
 
export const stateDefault = {
    user_login: user_login,
    user_signup: {},
    list: null, 
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

            console.log(newList)
            return { ...state, list: newList}
        }
        default:
            return { ...state };
    }
};