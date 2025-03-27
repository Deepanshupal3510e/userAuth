import cloudinary from "cloudinary"
import { configDotenv } from "dotenv";

configDotenv()

cloudinary.v2.config({
  cloud_name: 'dpjmowvbu',
  api_key: '576399647249126',
  api_secret: "zOEY20bsEfXebQRdmCVucRKHKcI" ,
  secure: true,
});

export default cloudinary

