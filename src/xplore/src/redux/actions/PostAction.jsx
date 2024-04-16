import { postService } from "../../services/PostService";
import { GET_POST_BY_USER } from "../types";

export const getPostByUser = (id_user) => {
    return async (dispatch) => {
        try {
            const result = await postService.getPostByUser(id_user);

            if (result.status === 200) {
                dispatch({
                    type: GET_POST_BY_USER,
                    post: result.data.content
                });
                
            }
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};