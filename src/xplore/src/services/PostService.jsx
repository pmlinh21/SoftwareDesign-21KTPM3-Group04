import { BaseService } from "./BaseService";

export class PostService extends BaseService {
    // Api 1: Get post by id
    getPostById = (id) => {
        return this.get(`post/${id}/user/0`);
    }
    
    // Api 2: Get post by user
    getPostByUser = (id_user) => {
      // console.log("id_user: ", id_user);
      return this.get(`post/user/${id_user}`);
    }

    // Api 3: Create a post
    createPost = (formData) => {
      console.log("createPost: ", formData);
      return this.post(`post/`, formData);
    }

    // Api 4: Update post information
    updatePost = (formData) => {
      console.log("updatePost: ", formData);
      return this.put(`post/`, formData);
    }
}

export const postService = new PostService();