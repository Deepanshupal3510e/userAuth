import { configDotenv } from "dotenv";
import uesrModel from "../models/user.model.js";
import cloudinary from "../utils/uploadImage.js";
import jwt from "jsonwebtoken"
configDotenv()
export const uploadUserProfilePic = async (req , res) => {
    try {
        const token = req.headers.authorization;
        const userId = jwt.verify(token , process.env.JWT_SECRET ).id
        console.log(userId , " this is userId")
        const user = await uesrModel.findById(userId);

        if(!user){
            return res.json({
                message : "user not found",
                success : false,
                error : true
            })
        };


        console.log("image uploading start")

            let imageUrl = ""
            console.log(req.file)
           await cloudinary.uploader.upload(req.file.path, (result, err) => {
            console.log(req.file.path , " this is file path")
                if(result.secure_url != ""){
                    imageUrl = result.secure_url
                }
            });



            console.log(imageUrl , "this is image url")

            const updateProfile = await uesrModel.findByIdAndUpdate(userId , {profilePic : imageUrl} , {new : true})


            return res.json({
                message : "profile updated succesfully",
                error : false,
                success : true,
                data : updateProfile
            })

    } catch (error) {
            return res.status(500).json({
                messaage : error.message || error,
                success : false,
                error : true
            })
    }
}



export const  createNewUserData = (req , res) => {
    try {
        const { imageUrl , text} = req.body;

    } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error : true,
                success : false
            })
    }   
}