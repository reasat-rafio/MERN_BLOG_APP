import dotenv from "dotenv";
import cloudinary from "cloudinary";

const { v2 } = cloudinary;

v2.config({
   cloud_name: process.env.CLOUD_NAME || "dapjxqk64",
   api_key: process.env.API_KEY || "561777715128625",
   api_secret: process.env.API_SECRET || "WOvlNOBYfsPKg1JoKgUs1TBIIhg",
});

export default v2;
