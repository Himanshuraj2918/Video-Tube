import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

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
        // console.log("\nColudinary Response:", response);
        
        // console.log("\nFile is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response;

  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null
  }
};

const deleteFromCloudinary = async(imageLink)=>{
  try {
      if(!imageLink) return null
        
      const publicId = imageLink.split('/').slice(-1)[0].split('.')[0]; //extracted public id from url
      // console.log(publicId);
      
      const value = await cloudinary.uploader.destroy(publicId,{
        invalidate: true, resource_type: "image"
        })
        // console.log(value);
        
      return true
  } catch (error) {
    throw new ApiError(400,error?.message || "Image delete error on cloud")
  }
}

export {uploadOnCloudinary, deleteFromCloudinary}
