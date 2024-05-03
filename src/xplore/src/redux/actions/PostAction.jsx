import { postService } from "../../services/PostService";
import { commonService } from "../../services/CommonService";
import { 
    GET_POST_BY_USER, 
    GET_TOP_POSTS,
    CREATE_POST,
    UPDATE_POST,
    HIDE_LOADING, DISPLAY_LOADING} from "../types";

export const getPostByUser = (id_user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            const result = await postService.getPostByUser(id_user);

            if (result.status === 200) {
                dispatch({
                    type: GET_POST_BY_USER,
                    posts: result.data.content
                });
            }

            dispatch({
                type: HIDE_LOADING
            });
            
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

export const createPostAction = (postInfo, uploadedThumbnail) => {
    return async (dispatch) => {
        try {
            let imgResult;
            if (uploadedThumbnail) {
                imgResult = await commonService.uploadImgToCloudinary( uploadedThumbnail)
            }

            if (!uploadedThumbnail || imgResult){
                const postResult = await postService.createPost({
                    ...postInfo,
                    thumbnail: imgResult || null
                });
            
                if (postResult.status === 200) {
                    const {id_user,...newPost} = postResult.data.content
                    dispatch({
                        type: CREATE_POST,
                        newPost: newPost
                    });
                }
            }
            
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    }
}

export const updatePostAction = (postInfo, uploadedThumbnail) => {
    return async (dispatch) => {
        try {
            let imgResult = null;
            if (uploadedThumbnail) {
                imgResult = await commonService.uploadImgToCloudinary( uploadedThumbnail)
            }

            if (!uploadedThumbnail || imgResult){
                const newThumbnail = imgResult ? imgResult : postInfo.thumbnail; 
                const result = await postService.updatePost({
                    ...postInfo,
                    thumbnail: newThumbnail 
                });
                
                if (result.status === 200) {
                    // console.log(result.data.content)
                    const {id_user,...updatedPost} = result.data.content
                    dispatch({
                        type: UPDATE_POST,
                        updatedPost: updatedPost
                    });
                }
            }
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    }
}

export const deletePostAction = (id_post) => {
    return async (dispatch) => {
        try {
            const formData = {
                id_post: id_post
            }
            const result = await postService.deletePost(formData)

            if (result.status === 200) {
                
            }
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    }
}
