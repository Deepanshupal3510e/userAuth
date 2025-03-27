import { configDotenv } from "dotenv";
import  jwt  from "jsonwebtoken";
configDotenv()
export const authMiddelware = async (req , res , next) => {
    try {
            const token = req.headers.authorization;

            if(!token){
                return res.json({
                    message : "unauthorized access token not exists",
                    error : true,
                    success : false
                })
            };


            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            req.body.userId = decoded.id

            next();


    } catch (error) {
            return res.status(500).json({
                messaage : error.message || error,
                success : false,
                error : true
            })
    }
}