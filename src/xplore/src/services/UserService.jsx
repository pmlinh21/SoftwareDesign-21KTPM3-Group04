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

  }
  
export const userService = new UserService();