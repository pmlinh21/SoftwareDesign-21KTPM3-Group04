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
    unlikePost = (id_post, id_user) => {
      // console.log("updatePost: ", id_post);
      return this.delete(`post/like/${id_post}/user/${id_user}`);
    }

    // Api 10: Get response of post
    getResponseOfPost = (id_post) => {
      return this.get(`post/response/${id_post}`);
    }

    // Api 11.1: Response post
    responsePost = (formData) => {
      // console.log("updatePost: ", formData);
      return this.post(`post/response`, formData);
    }
    
    // Api 11.2: Update response
    updateResponse = (formData) => {
      // console.log("updatePost: ", formData);
      return this.put(`post/response`, formData);
    }

    // Api 12: Delete response post
    deleteResponse = (id_response) => {
      // console.log("updatePost: ", formData);
      return this.delete(`post/response/${id_response}`);
    }

    // Api 13.1: reply a response
    replyResponse = (formData) => {
      // console.log("updatePost: ", formData);
      return this.post(`post/reply`, formData);
    }

    // Api 13.2: update reply 
    updateReply = (formData) => {
      // console.log("updatePost: ", formData);
      return this.put(`post/reply`, formData);
    }

    // Api 14: Delete reply a response
    deleteReply = (id_response) => {
      // console.log("updatePost: ", formData);
      return this.delete(`post/reply/${id_response}`);
    }

    // Api 15: 
    getHighlight = (id_post, id_user) => {
      // console.log("updatePost: ", formData);
      return this.get(`post/highlight/${id_post}/user/${id_user}`);
    }

    // Api 16: 
    createHighlight = (formData) => {
      // console.log("updatePost: ", formData);
      return this.post(`post/highlight`, formData);
    }

    // Api 17: 
    deleteHighlight = (removeHighlight) => {
      // console.log("updatePost: ", id_highlight);
      return this.put(`post/highlight`, removeHighlight);
    }

    // Api 18
    readPost = (formData) => {
      // console.log("updatePost: ", formData);
      return this.post(`post/reading_history`, formData);
    }

}

export const postService = new PostService();