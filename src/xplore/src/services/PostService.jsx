import { BaseService } from "./BaseService";

export class PostService extends BaseService {
    // Api 1: Get post by id
    getPostById = (id) => {
        return this.get(`post/${id}`);
    }
    
    // Api 2: Get post by user
    getPostByUser = (id_user) => {
      console.log("id_user: ", id_user);
      return this.get(`post/user/${id_user}`);
    }
}

export const postService = new PostService();