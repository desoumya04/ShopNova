import{ v2 as cloudinary }from 'cloudinary';
import { apiError } from '../utils/apiError.js';
import fs from 'fs';
import { apiResponse } from '../utils/apiResponse.js';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath: string) => {
  try{
    if(!filePath){
      throw new apiError(404, 'File path is required for image upload');
    }
    const result = await cloudinary.uploader.upload(filePath,{
      resource_type: 'auto',
    })
    console.log('Image uploaded successfully',result.url);
    fs.unlinkSync(filePath);
    return new apiResponse(200, {url: result.url}, 'Image uploaded successfully');
  }catch(error){
    fs.unlinkSync(filePath);


    console.error('Error uploading image:', error);
    throw new apiError(500, 'Error uploading image');
  }
}

export default uploadImage;