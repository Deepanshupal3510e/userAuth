import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import { sendVerifyemailOtp } from "../utils/verifyemailSendEmail.js";
import { sendEmail } from "../utils/sendEmail.js";
export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body, " this is body");
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const newUserDetails = await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      error: false,
      success: true,
      data: newUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    console.log(email, password, " this is user details");
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(200).json({
        message: "email or password is not matched",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);

    console.log(accessToken);

    return res.status(200).json({
      message: "User logged in successfully",
      error: false,
      success: true,
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "please provide userID",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not exist",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "these are user details",
      success: true,
      error: false,
      user,
    });
  } catch (error) {
    return res.statu(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const sendEmailVerifyOtpController = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        message: "user not found",
        error: true,
        success: false,
      });
    }

    let otp;
    const generateOtp = () => {
      otp = Math.ceil(Math.random() * 1000000);
      console.log(otp, "this is otp");
      if (otp >= 999999) {
        generateOtp();
      }
    };

    generateOtp();
    sendVerifyemailOtp(user.name, user.email, otp);
    const update = await userModel.findByIdAndUpdate(
      userId,
      { verificationOtp: otp },
      { new: true }
    );

    return res.json({
      message: " otp send successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      some: " this is error",
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const vefiyuserEmailController = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    console.log(req.body);
    if (!userId || !otp) {
      return res.json({
        message: "please provide required details",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        message: "user not exist",
        error: true,
        success: false,
      });
    }

    const ischeck = user.verificationOtp == otp;

    if (!ischeck) {
      return res.json({
        message: "invalid otp",
        success: false,
        error: true,
      });
    }

    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { verified: true , verificationOtp : null},
      { new: true }
    );
    return res.json({
      message: "otp verified",
      success: true,
      error: false,
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const sendEmailForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        message: "Provide email",
        success: false,
        error: true,
      });
    }

    const user = await userModel.find({ email });

    if (!user) {
      return res.json({
        message: "user not found",
        error: true,
        success: false,
      });
    }

    let otp;
    const generateOtp = () => {
      otp = Math.ceil(Math.random() * 1000000);
      console.log(otp, "this is otp");
      if (otp >= 999999) {
        generateOtp();
      }
    };

    generateOtp();

    const updateUser = await userModel.findOneAndUpdate({email} , {verificationOtp : otp})
     sendEmail(user[0].name , email , otp)


    return res.json({
        message : "otp send succesfully",
        error : false,
        success : true
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};


export const verifyandChangePassword = async (req , res) => {
    try {
        const {email , password, otp} = req.body;
        if(!email || !password || !otp){
            return res.json({
                message : "please fill all fields",
                error : true,
                success : false
            })
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({
                message : "user not found",
                error : true,
                success : false
            })
        }


        if(otp != user.verificationOtp){
            return res.json({
                message : "incorrect otp",
                error : true,
                success : false
            })
        }


        const hashPassword = await bcrypt.hash(password , 12)
        console.log(hashPassword);


        const updatePassword = await userModel.findByIdAndUpdate(user._id , {
            password : hashPassword,
            verificationOtp : null
        }
    )


        return res.json({
            message : "password changed",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}