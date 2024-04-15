import { BaseService } from './BaseService';

export class PostService extends BaseService {
    // Api 1: Get post by id
    getPostById = (id) => {
        return this.get(`post/${id}`);
    }
}

export const postService = new PostService();