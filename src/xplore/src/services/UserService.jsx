import { baseService } from "./BaseService";

export class UserService extends baseService {
    // Api 1: login
    login = (user_login) => {
        return this.get(`user/login`, user_login);
    }

    //Api 2: get user info by email
    getUserByEmail = (email) =>{
        return this.get(`user/getUser/${email}`);
      };

    // Api 3: Signup
    signup = (formData) =>{
      return this.post(`user/signup`, formData);
    };

    
  }
  
export const userService = new UserService();