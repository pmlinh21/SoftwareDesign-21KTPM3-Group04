import { USER_LOGIN } from "../../util/config";
import { LOGIN, SIGNUP, GET_USER_BY_EMAIL } from "../types";

let user_login = {};
if(localStorage.getItem(USER_LOGIN)){
    user_login = JSON.parse(localStorage.getItem(USER_LOGIN));
}

export const stateDefault = {
    user_login: user_login,
    user_signup: {}
};

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOGIN:{
            return { ...state, user_login: action.user_login };
        }
        case SIGNUP:{
            return { ...state, user_signup: action.formData };
        }
        default:
            return { ...state };
    }
};