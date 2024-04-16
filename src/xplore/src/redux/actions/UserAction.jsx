import { userService } from "../../services/UserService";
import { USER_LOGIN, TokenKey, RoleKey } from "../../util/config";
import { LOGIN, SIGNUP, GET_TOP_USERS } from "../types";

export const loginAction = (user_login) => {
    return async (dispatch) => {
        try {
            console.log("user_login: ", user_login);
            const result = await userService.login(user_login);

            if (result.status === 200) {
                // Store token in localStorage
                localStorage.setItem(TokenKey, result.data.content);

                var date = new Date();
                date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toUTCString();

                document.cookie = "token" + "=" + result.data.content + expires + "; path=/";

                const userResult = await userService.getUserByEmail(user_login.email);
                console.log("userResult: ", userResult)

                if (userResult.status === 200) {
                    dispatch({
                        type: LOGIN,
                        user_login: userResult.data.content
                    });
                }

                // Store user information in localStorage
                localStorage.setItem(USER_LOGIN, JSON.stringify(userResult.data.content));
                
                if(userResult.data.message === "User found")
                    localStorage.setItem(RoleKey, userResult.data.content.is_member ? "2" : "1");
                else
                    localStorage.setItem(RoleKey, "3");

                const roleId = localStorage.getItem(RoleKey);
                
                if(roleId === "1") // non-member
                    window.history.pushState(null,null,"/");
                if(roleId === "2") // member
                    window.history.pushState(null,null,"/");
                if(roleId === "3") // admin
                    window.history.pushState(null,null,"/");
                window.location.reload()
            }
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};

export const signupAction = (formData) => {
    return async (dispatch) =>{
        try {
            console.log(formData)
            const result = await userService.signup(formData);
            if (result.status === 200){
            dispatch({
                type: SIGNUP,
                formData: result.data.content
            });
            }
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};

export const getUserByEmailAction = (email) => {
    return async (dispatch) => {
        try {
            const userResult = await userService.getUserByEmail(email);

            if (userResult.status === 200) {
                dispatch({
                    type: LOGIN,
                    user_login: userResult.data.content
                });


                // Store user information in localStorage
                localStorage.setItem(USER_LOGIN, JSON.stringify(userResult.data.content));
                
                if(userResult.data.message === "User found")
                    localStorage.setItem(RoleKey, userResult.data.content.is_member ? "2" : "1");
                else
                    localStorage.setItem(RoleKey, "3");

                const userToken = await userService.getUserToken(email);

                if (userToken.status === 200) {
                    // Store token in localStorage
                    localStorage.setItem(TokenKey, userToken.data.content);

                    var date = new Date();
                    date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toUTCString();

                    document.cookie = "token" + "=" + userToken.data.content + expires + "; path=/";

                    const searchParams = new URLSearchParams(window.location.search);
                    searchParams.delete('email');

                    // Replace the URL with new URLSearchParams
                    window.history.replaceState({}, '', `${window.location.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`)
                }

                
            }
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};
/*
export const getTopUsers = () => {
    const topId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return async (dispatch) => {
        try {
            let topUsers = []
            for (let i = 0; i < topId.length; i++) {
                const result = await userService.getUserById(topId[i]);
                if (result.status === 200) {
                    topUsers.push(result.data.content)
                }
            }
            
            dispatch({
                type: GET_TOP_USERS,
                topUsers: topUsers
            });

        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
}
*/