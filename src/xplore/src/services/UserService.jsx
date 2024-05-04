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

    // Api 6.1: Get list by user 
    getListByUser = (id_user) =>{
      return this.get(`user/list/${id_user}`);
    }

    // Api 6.2: Create a list 
    createList = (formData) =>{
      return this.post(`user/list`, formData);
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
      return this.get(`/post/user/${id_user}`);
    }

    // Api 10: Get author subscriber 
    getAuthorSubscriber = (id_user) =>{
      return this.get(`user/subscriber/${id_user}`);
    }

    // Api 11: Get user reading history
    getReadingHistory = (id_user) =>{
      return this.get(`user/reading_history/${id_user}`);
    }

    // Api 12: Get author list 
    getAuthorList = (id_user) =>{
      return this.get(`/user/list/${id_user}`);
    }

    // Api 13: Is follow author 
    isFollowAuthor = (user, subscriber) =>{
      return this.get(`/user/follow/${user}/${subscriber}`);
    }

    // Api 14: Unfollow author 
    unfollowAuthor = (user, subscriber) =>{
      return this.delete(`/user/subscribe/${user}/${subscriber}`);
    }

    // Api 15: Follow author 
    followAuthor = (user, subscriber) =>{
      return this.post(`/user/subscribe/${user}/${subscriber}`);
    }

    // Api 16: Send email
    sendEmail = (formData) =>{
      return this.post(`/user/sendEmail`, formData);
    }

    // Api 17: Block author
    blockAuthor = (user, block) =>{
      return this.post(`/user/block/${user}/${block}`);
    }

    // Api 18: Get highlight by user
    getHighlightByUser = (id_user) =>{
      return this.get(`/user/highlight/${id_user}`);
    }

    // Api 19: Get user follower
    getUserFollower = (id_user) =>{
      return this.get(`/user/subscriber/${id_user}`);
    }

    // Api 19: Get user follow
    getUserFollow = (id_user) =>{
      return this.get(`/user/follow/${id_user}`);
    }

    // Api 20: Get user block
    getUserBlock = (id_user) =>{
      return this.get(`/user/block/${id_user}`);
    }

    // Api 21: Unblock user 
    unblockUser = (user, block) =>{
      return this.delete(`/user/block/${user}/${block}`);
    }

    // Api 22: Get all posts in list
    getPostByListId = (id_list) =>{
      return this.get(`/user/list/post/${id_list}`);
    }
    
    // Api 23: Pin post
    pinPost = (user, id_post) =>{
      return this.put(`/user/unpin/${user}/${id_post}`);
    }

    // Api 24: 
    deleteList = (id_list) =>{
        return this.delete(`/user/list/${id_list}`);
    }

    // Api 25: Update list
    updateList = (data) =>{
        return this.put(`/user/list/edit`, data);
    }

    // Api 26: Get user response
    getUserResponse = (id_user) =>{
        return this.get(`/user/response/${id_user}`);
    }

    // Api 27: Update user detail
    updateUserDetail = (id_user, formData) =>{
      return this.put(`/user/detail/${id_user}`, formData);
    }

    // Api 28: Update user profile
    updateUserProfile = (id_user, formData) =>{
      return this.put(`/user/profile/${id_user}`, formData);
    }

    // Api 29: Get all noti
    getNotification = (id_user) =>{
      return this.get(`/user/notification/received/${id_user}`);
    }

    // Api 30: Unpin post
    unpinPost = (user) =>{
      return this.put(`/user/unpin/${user}`);
    }

    // Api 31: Get user current subscription
    getUserCurrentSubscription = (user) =>{
      return this.get(`/user/current/${user}`);
    }

    // Api 32: Cancel plan
    cancelPlan = (id_user, id_subscription) =>{
      return this.put(`/user/subscription/${id_user}/${id_subscription}`);
    }

    // Api 33: Get user by ID
    getUserByID = (id_user) =>{
      return this.get(`/user/${id_user}`);
    }

    // Api 34: 
    getInvisibleUsers = (id_user) =>{
      return this.get(`/user/invisible/${id_user}`);
    }
}
  
export const userService = new UserService();