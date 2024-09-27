import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null 
      // upload th e file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      })
      
        //file uploaded
        console.log("\nColudinary Response:", response);
        
        console.log("\nFile is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response;

  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null
  }
};

export {uploadOnCloudinary}
