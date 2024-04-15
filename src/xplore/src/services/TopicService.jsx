import { baseService } from "./BaseService";

export class TopicService extends baseService {
    // Api 1: Get all topics
    getAllTopics = () => {
        return this.get(`topic/`);
    }

    // Api 2: Get topic by id
    getTopicById = (id) => {
        return this.get(`topic/${id}/post`);
    }
}

export const topicService = new TopicService();