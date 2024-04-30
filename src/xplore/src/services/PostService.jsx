import { BaseService } from "./BaseService";

export class PostService extends BaseService {
    // Api 1: Get post by id
    getPostById = (id) => {
        return this.get(`post/${id}`);
    }
    
    // Api 2: Get post by user
    getPostByUser = (id_user) => {
      // console.log("id_user: ", id_user);
      return this.get(`post/user/${id_user}`);
    }

    // Api 3: Create a post
    createPost = (formData) => {
      // console.log("createPost: ", formData);
      return this.post(`post/`, formData);
    }

    // Api 4: Update post information
    updatePost = (formData) => {
      // console.log("updatePost: ", formData);
      return this.put(`post/`, formData);
    }

    // Api 5: Get trending posts
    getTrendingPosts = () => {
        return this.get(`post/trending-view`);
    }

    // Api 6: Delete post
    deletePost = (formData) => {
      console.log("updatePost: ", formData);
      return this.delete(`post/`, formData);
    }

    // Api 7: Get like of post
    getLikeOfPost = (id_post, id_user) => {
      return this.get(`post/like/${id_post}/user/${id_user}`);
    }

    // Api 8: Like post
    likePost = (formData) => {
      // console.log("updatePost: ", formData);
      return this.post(`post/like`, formData);
    }

    // Api 9: Unlike post
    unlikePost = (formData) => {
      // console.log("updatePost: ", formData);
      return this.delete(`post/like`, formData);
    }

    // Api 10: Get response of post
    getResponseOfPost = (id_post) => {
      return this.get(`post/response/${id_post}`);
    }

    // Api 11: Response post
    responsePost = (formData) => {
      // console.log("updatePost: ", formData);
      return this.post(`post/response`, formData);
    }

    // Api 12: Delete response post
    deleteResponse = (formData) => {
      // console.log("updatePost: ", formData);
      return this.delete(`post/response`, formData);
    }

    // Api 13: reply a response
    replyResponse = (formData) => {
      // console.log("updatePost: ", formData);
      return this.post(`post/reply`, formData);
    }

    // Api 14: Delete reply a response
    deleteReply = (formData) => {
      // console.log("updatePost: ", formData);
      return this.delete(`post/reply`, formData);
    }

    // Api 15: 
    createHighlight = (formData) => {
      // console.log("updatePost: ", formData);
      return this.post(`post/highlight`, formData);
    }

    // Api 16: 
    deleteHighlight = (formData) => {
      // console.log("updatePost: ", formData);
      return this.delete(`post/highlight`, formData);
    }

}

export const postService = new PostService();