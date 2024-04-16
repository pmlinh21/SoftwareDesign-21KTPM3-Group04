import { postService } from "../../services/PostService";
import { 
    GET_POST_BY_USER, 
    GET_TOP_POSTS,
    CREATE_POST } from "../types";

export const getPostByUser = (id_user) => {
    return async (dispatch) => {
        try {
            const result = await postService.getPostByUser(id_user);

            if (result.status === 200) {
                dispatch({
                    type: GET_POST_BY_USER,
                    posts: result.data.content
                });
                
            }
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    }
}
            
export const getTopPostsAction = () => {
    const topId = [1, 2, 3, 4, 5, 6]
    return async (dispatch) => {
        try {
            let topPosts = [];
            for (let i = 0; i < topId.length; i++) {
                const result = await postService.getPostById(topId[i]);
                if (result.status === 200) {
                    topPosts.push(result.data.content)
                    console.log("topPost", result.data.content);
                }
            }
            console.log("topPosts from action", topPosts);
            dispatch({
                type: GET_TOP_POSTS,
                topPosts: topPosts
            });

        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};

export const createPostAction = (postInfo) => {
    return async (dispatch) => {
        try {

            const result = await postService.createPost(postInfo);
            
            if (result.status === 200) {
                dispatch({
                    type: CREATE_POST,
                    posts: result.data.content
                });
                
            }
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    }
}
