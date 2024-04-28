import { BaseService } from "./BaseService";

export class UserService extends BaseService {
    // Api 1: login
    login = (user_login) => {
      console.log("user_login: ", user_login);
      return this.post(`user/login`, user_login);
    }

    //Api 2: get user info by email
    getUserByEmail = (email) => {
      return this.get(`user/getUser/${email}`);
    };

    // Api 3: Signup
    signup = (formData) => {
      return this.post(`user/signup`, formData);
    };

    // Api 4: Get User info by id
    getUserById = (id) =>{
        return this.get(`user/${id}`);
    };
    
    // Api 5: Get user token
    getUserToken = (email) =>{
      return this.get(`user/getToken/${email}`);
    }

    // Api 6: Get list by user 
    getListByUser = (id_user) =>{
      return this.get(`user/list/${id_user}`);
    }

    // Api 7: Add post to list
    addPostToList = (formData) =>{
      return this.post(`user/list/post`, formData);
    }

    // Api 8: Delete post from list 
    deletePostFromList = (id_list, id_post) =>{
      return this.delete(`user/list/post/${id_list}/${id_post}`);
    }

    // Api 8: Get topic by user
    getTopicByUser = (id_user) =>{
      return this.get(`user/topic/${id_user}`);
    }

    // Api 8: Follow / unfollow topic 
    followTopic = (id_user, id_topic) =>{
      return this.put(`user/topic/${id_user}/${id_topic}`);
    }

    // Api 9: Get author post 
    getAuthorPost = (id_user) =>{
      return this.get(`user/post/${id_user}`);
    }
  }
  
export const userService = new UserService();