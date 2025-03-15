import {v2 as cloudinary} from "cloudinary"

import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    console.log("File uploaded to Cloudinary:", response.secure_url);

    // Delete the local file after upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    // Delete the local file if the upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

const deleteFromCloudinary = async (oldCoverUrl) => {
    try {
      // Extract the public_id from the Cloudinary URL
      const publicId = oldCoverUrl.split('/').pop().split('.')[0]; // Extracts the file name (before the extension)
  
      
      
      // Delete the image from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId);
  
      console.log("Result : ", result);
      // Handle the result of the deletion
      if (result.result === "ok") {
        
        return true;
      } else {
       
        return false;
      }
  
    } catch (error) {
     
      return false;
    }
  };
  


export {uploadOnCloudinary,deleteFromCloudinary}