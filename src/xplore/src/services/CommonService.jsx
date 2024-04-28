import { BaseService } from "./BaseService";

export class CommonService extends BaseService {
    // Api 1: Get config to upload image
    getConfigCloundinary = () => {
      return this.get(`cloudinary`);
    }

    // Api 2: Upload image to cloudinary
    uploadImgToCloudinary = async (image) => {
      const config = await commonService.getConfigCloundinary();
      if (config.data) {
        const url = "https://api.cloudinary.com/v1_1/" + config.data.cloudname + "/auto/upload";

        const cloudinaryData = new FormData();
        cloudinaryData.append("file", image);
        cloudinaryData.append("api_key", config.data.apikey);
        cloudinaryData.append("timestamp", config.data.timestamp);
        cloudinaryData.append("signature", config.data.signature);
        cloudinaryData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
        cloudinaryData.append("folder", "xplore");
  
        try {
          const response = await fetch(url, {
            method: "POST",
            body: cloudinaryData
          });
      
          if (!response.ok) {
            throw new Error('Upload failed');
          }
      
          const data = await response.text();
          return JSON.parse(data).secure_url;
        } catch (error) {
          console.error("Error:", error);
          return null;
        }
      } 
      return null
    }

    // Api 3: Get all memberships
    getAllMembership = () => {
      return this.get(`membership`);
    }
}

export const commonService = new CommonService();