import { userService } from "../../services/UserService";
import { USER_LOGIN, TokenKey, RoleKey } from "../../util/config";
import { LOGIN, SIGNUP, 
    GET_LIST_BY_USER, ADD_POST_TO_LIST, DELETE_POST_FROM_LIST,
    GET_TOPIC_BY_USER,FOLLOW_TOPIC,UNFOLLOW_TOPIC,
    HIDE_LOADING, DISPLAY_LOADING,
    GET_AUTHOR_POST, GET_AUTHOR_SUBSCRIBER, GET_AUTHOR_LIST } from "../types";

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
            // alert(error.response.data.message)
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
            // alert(error.response.data.message)
        }
    };
};

export const getListByUserAction = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const listResult = await userService.getListByUser(id_user);

            if (listResult.status === 200) {
                dispatch({
                    type: GET_LIST_BY_USER,
                    list: listResult.data.content
                });
            }
            
            dispatch({
                type: HIDE_LOADING
            });
        } catch (error) {
            console.log("error", error.response);
            // alert(error.response.data.message)
        }
    };
};

export const addPostToListAction = (id_list, id_post) => {
    return async (dispatch) => {
        try {
            const listResult = await userService.addPostToList({id_list, id_post});

            if (listResult.status === 200) {
                dispatch({
                    type: ADD_POST_TO_LIST,
                    id_list: id_list,
                    id_post: id_post
                });
            }

        } catch (error) {
            console.log("error", error);
            // alert(error.response.data.message)
        }
    };
};

export const deletePostFromListAction = (id_list, id_post) => {
    return async (dispatch) => {
        try {
            
            const listResult = await userService.deletePostFromList(id_list, id_post);

            if (listResult.status === 200) {
                dispatch({
                    type: DELETE_POST_FROM_LIST,
                    id_list: id_list,
                    id_post: id_post
                });
            }
        } catch (error) {
            console.log("error", error);
            // alert(error.response.data.message)
        }
    };
};

export const getTopicByUserAction = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const topicResult = await userService.getTopicByUser(id_user);

            if (topicResult.status === 200) {
                dispatch({
                    type: GET_TOPIC_BY_USER,
                    topic: topicResult.data.content
                });
            }
            
            dispatch({
                type: HIDE_LOADING
            });
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const FollowTopicAction = (id_user, id_topic) => {
    return async (dispatch) => {
        try {
            const topicResult = await userService.followTopic(id_user, id_topic);

            if (topicResult.status === 200) {
                dispatch({
                    type: FOLLOW_TOPIC,
                    id_topic: id_topic
                });
            }

        } catch (error) {
            console.log("error", error);
        }
    };
};

export const UnfollowTopicAction = (id_user, id_topic) => {
    return async (dispatch) => {
        try {
            const topicResult = await userService.followTopic(id_user, id_topic);

            if (topicResult.status === 200) {
                dispatch({
                    type: UNFOLLOW_TOPIC,
                    id_topic: id_topic
                });
            }

        } catch (error) {
            console.log("error", error);
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

export const getAuthorPostAction = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const postResult = await userService.getAuthorPost(id_user);

            if (postResult.status === 200) {
                dispatch({
                    type: GET_AUTHOR_POST,
                    author_post: postResult.data.content
                });
            }
            
            dispatch({
                type: HIDE_LOADING
            });
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};

export const getAuthorSubscriberAction = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const subscriberResult = await userService.getAuthorSubscriber(id_user);

            if (subscriberResult.status === 200) {
                dispatch({
                    type: GET_AUTHOR_SUBSCRIBER,
                    author_subscriber: subscriberResult.data.content
                });
            }
            
            dispatch({
                type: HIDE_LOADING
            });
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};

export const getAuthorListAction = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const listResult = await userService.getAuthorList(id_user);

            if (listResult.status === 200) {
                dispatch({
                    type: GET_AUTHOR_LIST,
                    author_list: listResult.data.content
                });
            }
            
            dispatch({
                type: HIDE_LOADING
            });
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};