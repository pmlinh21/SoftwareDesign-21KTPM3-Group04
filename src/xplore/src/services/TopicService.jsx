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

    getPostByTopic = (id_topics) => {
        return this.get(`topic/${id_topics}/post`);
    }

    getHotTopics = () => {
        return this.get(`topic/trending`);
    }
}

export const topicService = new TopicService();