import { BaseService } from "./BaseService";

export class TopicService extends BaseService {
    // Api 1: Get all topics
    getAllTopics = () => {
        return this.get(`topic/`);
    }

    // Api 2: Get topic by id
    getTopicById = (id) => {
        return this.get(`topic/${id}/post`);
    }

    getHotTopics = () => {
        return this.get(`topic/reading_history`);
    }
}

export const topicService = new TopicService();