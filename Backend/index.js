
import { configDotenv } from 'dotenv';
import express from 'express';
import { connectDatabase } from './connectDatabase.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import Cors from 'cors';
import { sendEmail } from './utils/sendEmail.js';
import ImageRouter from './routes/uploadImage.js';
configDotenv()
const App = express();
connectDatabase()
App.use(Cors())
App.use(cookieParser());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.get("/send-email" , async (req , res) => {
  await sendEmail("hello " , "nothing")
  res.send("Email sent successfully")
})

// App.post("/upload" , upload.single("image")  , (req , res) => {
//   cloudinary.uploader.upload(req.file.path) , (err , result) => {
//     if(err){
//       return res.status(500).json({
//         message : error.message || error,
//         success : false,
//         error : true
//       })
//     }

//     return res.json({
//       message : "file uploaded ",
//       error : false,
//       success  :true,
//       data : result
//     })
//   } 
// }
// )








App.use('/api/user', userRouter)
App.use("/api/upload" , ImageRouter)
App.listen(process.env.PORT, () => {
  console.log('Server is running on port ', process.env.PORT);
});