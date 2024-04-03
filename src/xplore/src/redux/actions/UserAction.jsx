import { userService } from "../../services/UserService";
import { USER_LOGIN, TokenKey, RoleKey } from "../../util/config";
import { LOGIN, SIGNUP } from "../types";

export const loginAction = (user_login) => {
  return async (dispatch) => {
    try {
        const result = await userService.login(user_login);

        if (result.status === 200) {
            // Store token in localStorage
            localStorage.setItem(TokenKey, result.data.content);

            const userResult = await userService.getUserByEmail(user_login.email);
            console.log(userResult)

            if (userResult.status === 200) {
                dispatch({
                    type: LOGIN,
                    user_login: userResult.data.content
                });
            }

            // Store user information in localStorage
            localStorage.setItem(USER_LOGIN, JSON.stringify(userResult.data.content));
            localStorage.setItem(RoleKey, JSON.stringify(userResult.data.content.is_member));

            const roleId = localStorage.getItem(RoleKey);
            
            if(roleId === "1") // non-member
                window.history.pushState(null,null,"/");
            if(roleId === "2") // member
                window.history.pushState(null,null,"/");
            if(roleId === "3") // admin
                window.history.pushState(null,null,"/dashboard-admin");
            //window.location.reload()
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