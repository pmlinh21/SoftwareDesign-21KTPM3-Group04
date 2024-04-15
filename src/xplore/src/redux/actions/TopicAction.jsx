import { topicService } from "../../services/TopicService";
import { GET_ALL_TOPICS, GET_TOPIC_BY_ID } from "../types";

export const getAllTopics = () => {
    return async (dispatch) => {
        try {
            const result = await topicService.getAllTopics();

            if (result.status === 200) {
                dispatch({
                    type: GET_ALL_TOPICS,
                    topics: result.data.content,
                });
                console.log("result.data.content", result.data.content)
            }
        } catch (error) {
            console.log("error", error.response);
            alert(error.response.data.message)
        }
    };
};