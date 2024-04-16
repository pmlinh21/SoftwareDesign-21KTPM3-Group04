import { DOMAIN, TokenKey, RoleKey, RoleMapping } from "../util/config";
import axios from "axios";

export class BaseService {
    getUserRole = () =>{
        const roleId = localStorage.getItem(RoleKey);
        return RoleMapping[roleId];
    };
    
    addCommonHeaders = (headers = {}) => {
        const role = this.getUserRole();
        // console.log("role: ", role)
        const Token = localStorage.getItem(TokenKey);
        if(Token){
            return {
                ...headers,
                TokenByClass: Token,
                Token: Token,
                Role: role 
            };
        }
        else{
            return {
                ...headers,
                Role: role
            };
        }
    };

    get = (url, headers = {}) => {
        return axios({
        url: `${DOMAIN}/${url}`,
        method: "GET",
        headers: this.addCommonHeaders(headers)
        });
    };

    post = (url, model, headers = {}) => {
        return axios({
        url: `${DOMAIN}/${url}`,
        method: "POST",
        data: model,
        headers: this.addCommonHeaders(headers)
        });
    };

    put = (url, model, headers = {}) => {
        return axios({
        url: `${DOMAIN}/${url}`,
        method: "PUT",
        data: model,
        headers: this.addCommonHeaders(headers) 
        });
    };

    delete = (url, headers = {}) => {
        return axios({
        url: `${DOMAIN}/${url}`,
        method: "DELETE",
        headers: this.addCommonHeaders(headers)
        });
    };

    patch = (url, headers = {}) => {
        return axios({
        url: `${DOMAIN}/${url}`,
        method: "PATCH",
        headers: this.addCommonHeaders(headers)
        });
    };

    isGuest = () =>{
        const roleId = localStorage.getItem(RoleKey);
        return !roleId;
    }
}

// Setup axios interceptor
export const http = axios.create({
    baseURL: DOMAIN, // Domain khi request api sẽ được ghép vào với link
    timeout: 30000, // Thời gian tối đa chờ response trả về
});