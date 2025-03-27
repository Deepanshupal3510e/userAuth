import express from "express"
import multer from "multer"
import { upload } from "../Middlewares/multer.js"
import { uploadUserProfilePic } from "../controllers/image.controller.js"
import { authMiddelware } from "../Middlewares/auth.js"

const ImageRouter = express()


ImageRouter.post("/user-porfile"  , authMiddelware, upload.single("image") , uploadUserProfilePic)

export default ImageRouter