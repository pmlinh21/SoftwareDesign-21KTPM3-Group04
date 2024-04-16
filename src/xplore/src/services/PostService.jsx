import { baseService } from "./BaseService";

export class PostService extends baseService {
    // Api 1: Get post by user
    getPostByUser = (id_user) => {
      console.log("id_user: ", id_user);
      return this.get(`post/user/${id_user}`, user_login);
    }

    // Api 2: Create a post
    // createPost = (formData) => {
    //   return this.post(`post/`, formData);
    // };

  }
  
export const postService = new PostService();