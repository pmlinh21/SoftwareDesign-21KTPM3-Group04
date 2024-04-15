import { postService } from "../../services/PostService";
import { GET_TOP_POSTS } from "../types";

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
    }
}