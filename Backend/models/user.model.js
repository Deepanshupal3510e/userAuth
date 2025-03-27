import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        default: 'user'
    },
    userData : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserData", 
        default: null,
    },
    accessToken : {
        type: String,
        default : ""
    },
    verified : {
        type : Boolean,
        default : false
     },
     profilePic : {
        type : String,
        default : ""
     },
    verificationOtp : {
        type : Number,
        default : ""
    }
})

const uesrModel = new mongoose.model('User', userSchema);
export default uesrModel;