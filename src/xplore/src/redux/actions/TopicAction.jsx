import { topicService } from "../../services/TopicService";
import { GET_ALL_TOPICS, GET_TOPIC_BY_ID } from "../types";

export const getAllTopicsAction = () => {
    return async (dispatch) => {
        try {
            const result = await topicService.getAllTopics();

            if (result.status === 200) {
                dispatch({
                    type: GET_ALL_TOPICS,
                    topics: result.data.content,
                });
            }
        } catch (error) {
            console.log("error", error.response);
            // alert(error.response.data.message)
        }
    };
};