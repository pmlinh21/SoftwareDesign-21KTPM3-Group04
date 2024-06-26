import { userService } from "../../services/UserService";
import { USER_LOGIN, TokenKey, RoleKey } from "../../util/config";
import { LOGIN, SIGNUP, LOGOUT,
    GET_INVISIBLE_USERS,
    GET_LIST_BY_USER, CREATE_LIST, ADD_POST_TO_LIST, DELETE_POST_FROM_LIST,
    GET_TOPIC_BY_USER,FOLLOW_TOPIC,UNFOLLOW_TOPIC,
    HIDE_LOADING, DISPLAY_LOADING,
    GET_AUTHOR_POST, GET_AUTHOR_SUBSCRIBER, GET_AUTHOR_LIST, IS_FOLLOW_AUTHOR,
    BLOCK_AUTHOR, GET_USER_FOLLOWER, GET_USER_FOLLOW, GET_USER_BLOCK, UNBLOCK_USER, 
    PIN_POST, UNPIN_POST,
    UPDATE_USER_DETAIL, UPDATE_USER_PROFILE, GET_USER_CURRENT_SUBSCRIPTION,
    CANCEL_PLAN} from "../types";

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
            return result;
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
            return result;
        } catch (error) {
            console.log("error", error.response);
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

export const createListAction = (formData) => {
    return async (dispatch) => {
        try {
            const listResult = await userService.createList(formData);

            if (listResult.status === 200) {
                const {id_user, ...newList} = listResult.data.content
                dispatch({
                    type: CREATE_LIST,
                    list: {...newList, saved_posts: []}
                });
            }
        } catch (error) {
            console.log("error", error.response);
            // alert(error.response.data.message)
        }
    };
};

export const addPostToListAction = (id_list, id_post, thumbnail) => {
    return async (dispatch) => {
        try {
            const listResult = await userService.addPostToList({id_list, id_post});

            if (listResult.status === 200) {
                dispatch({
                    type: ADD_POST_TO_LIST,
                    id_list: id_list,
                    id_post: id_post,
                    thumbnail: thumbnail
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

export const logOut = () => {
    return async (dispatch) => {
        dispatch({
            type: DISPLAY_LOADING
        });
        try {
            dispatch({
                type: LOGOUT
            });
        } catch (error) {
            console.log("error", error);
        }
        dispatch({
            type: HIDE_LOADING
        });
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

export const isFollowAuthorAction = (user, subscriber) => {
    return async (dispatch) => {
        try {
            // dispatch({
            //     type: DISPLAY_LOADING
            // });
            
            const isFollowResult = await userService.isFollowAuthor(user, subscriber);

            if (isFollowResult.status === 200) {
                //console.log("isFollowResult.data.message: ", isFollowResult.data.message)
                const isFollow = isFollowResult.data.message === "Author is already subscribed";
                dispatch({
                    type: IS_FOLLOW_AUTHOR,
                    is_follow: isFollow
                });
            }
            
            // dispatch({
            //     type: HIDE_LOADING
            // });
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};

export const unfollowAuthorAction = (user, subscriber) => {
    return async (dispatch) => {
        try {
            // dispatch({
            //     type: DISPLAY_LOADING
            // });
            
            const result = await userService.unfollowAuthor(user, subscriber);

            if (result.status === 200) {
                const isFollowResult = await userService.isFollowAuthor(user, subscriber);

                if (isFollowResult.status === 200) {
                    const isFollow = isFollowResult.data.message === "Author is already subscribed";
                    dispatch({
                        type: IS_FOLLOW_AUTHOR,
                        is_follow: isFollow
                    });

                    const followResult = await userService.getUserFollow(subscriber);

                    if (followResult.status === 200) {
                        dispatch({
                            type: GET_USER_FOLLOW,
                            user_follow: followResult.data.content
                        });
                    }
                    
                }
            }
            
            // dispatch({
            //     type: HIDE_LOADING
            // });
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};

export const followAuthorAction = (user, subscriber, fullname) => {
    return async (dispatch) => {
        try {
            // dispatch({
            //     type: DISPLAY_LOADING
            // });
            const result = await userService.followAuthor(user, subscriber);

            if (result.status === 200) {
                const isFollowResult = await userService.isFollowAuthor(user, subscriber);

                if (isFollowResult.status === 200) {
                    //console.log("isFollowResult.data.message: ", isFollowResult.data.message)
                    const isFollow = isFollowResult.data.message === "Author is already subscribed";
                    dispatch({
                        type: IS_FOLLOW_AUTHOR,
                        is_follow: isFollow
                    });

                    const followResult = await userService.getUserFollow(subscriber);

                    if (followResult.status === 200) {
                        dispatch({
                            type: GET_USER_FOLLOW,
                            user_follow: followResult.data.content
                        });
                    }
                }

                const formData = {
                    author: fullname,
                    id_subscriber: subscriber
                }
                console.log(formData)
                await userService.sendEmail(formData);
            }
            
            // dispatch({
            //     type: HIDE_LOADING
            // });
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};

export const blockAuthorAction = (user, block) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const result = await userService.blockAuthor(user, block);

            if (result.status === 200) {
                //console.log("result.data.message: ", result.data.message)

                if(result.data.message === "Block successfully"){
                    //console.log(block)
                    dispatch({
                        type: BLOCK_AUTHOR,
                        block: block
                    });
                }
            }
            
            dispatch({
                type: HIDE_LOADING
            });
            return result;
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    };
};

export const getUserFollowerAction = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const followerResult = await userService.getUserFollower(id_user);

            if (followerResult.status === 200) {
                dispatch({
                    type: GET_USER_FOLLOWER,
                    user_follower: followerResult.data.content
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

export const getUserFollowAction = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const followResult = await userService.getUserFollow(id_user);

            if (followResult.status === 200) {
                dispatch({
                    type: GET_USER_FOLLOW,
                    user_follow: followResult.data.content
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

export const getUserBlockAction = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const blockResult = await userService.getUserBlock(id_user);

            if (blockResult.status === 200) {
                dispatch({
                    type: GET_USER_BLOCK,
                    user_block: blockResult.data.content
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

export const unblockUserAction = (user, block) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const result = await userService.unblockUser(user, block);

            if (result.status === 200) {
                const blockResult = await userService.getUserBlock(user);

                if (blockResult.status === 200) {
                    dispatch({
                        type: GET_USER_BLOCK,
                        user_block: blockResult.data.content
                    });
                }

                dispatch({
                    type: UNBLOCK_USER,
                    block: block
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

export const pinPostAction = (user, id_post) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const result = await userService.pinPost(user, id_post);

            if (result.status === 200) {
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));

                dispatch({
                    type: PIN_POST,
                    user_login: result.data.content
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

export const unpinPostAction = (user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const result = await userService.unpinPost(user);

            if (result.status === 200) {
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));

                dispatch({
                    type: UNPIN_POST,
                    user_login: result.data.content
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

export const updateUserDetailAction = (id_user, formData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            console.log("Form data:", formData);
            
            const result = await userService.updateUserDetail(id_user, formData);

            if (result.status === 200) {
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));

                dispatch({
                    type: UPDATE_USER_DETAIL,
                    user_login: result.data.content
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

export const updateUserProfileAction = (id_user, formData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const result = await userService.updateUserProfile(id_user, formData);

            if (result.status === 200) {
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));

                dispatch({
                    type: UPDATE_USER_PROFILE,
                    user_login: result.data.content
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

export const getUserCurrentSubscriptionAction = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const result = await userService.getUserCurrentSubscription(id_user);

            if (result.status === 200) {
                dispatch({
                    type: GET_USER_CURRENT_SUBSCRIPTION,
                    user_current_subscription: result.data.content
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

export const cancelPlanAction = (id_user, id_subscription) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            
            const result = await userService.cancelPlan(id_user, id_subscription);

            if (result.status === 200) {
                dispatch({
                    type: CANCEL_PLAN,
                    user_login: result.data.content
                });

                const newResult = await userService.getUserCurrentSubscription(id_user);

                if (newResult.status === 200) {
                    dispatch({
                        type: GET_USER_CURRENT_SUBSCRIPTION,
                        user_current_subscription: newResult.data.content
                    });
                }
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

export const getInvisibleUsers = (id_user) => {
    return async (dispatch) => {
        try {
            
            const result = await userService.getInvisibleUsers(id_user);

            if (result.status === 200) {
                dispatch({
                    type: GET_INVISIBLE_USERS,
                    user_invisible: result.data.content
                });
            }

        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};
