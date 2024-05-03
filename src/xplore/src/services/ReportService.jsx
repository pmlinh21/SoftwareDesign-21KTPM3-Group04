import { BaseService } from "./BaseService";

export class ReportService extends BaseService {
    // Api 1: login
    createReportPost = (formData) => {
      console.log("formData: ", formData);
      return this.post(`report/post`, formData);
    }

    //Api 2: get user info by email
    createReportResponse = (formData) => {
      console.log("formData: ", formData);
      return this.post(`report/response`, formData);
    }
  }
  
export const reportService = new ReportService();