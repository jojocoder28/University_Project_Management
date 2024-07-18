import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const userRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, university, course, dob, phone, username, gender, password, confPassword } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !username ||
    !gender ||
    !university ||
    !course ||
    !dob ||
    !password ||
    !confPassword
  ) {
    // console.log(firstName+" "+lastName+" "+email+" "+phone+" "+username+" "+gender+" "+password+" "+confPassword)
    // console.log(req.body);
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  if (password !== confPassword){
    return next(new ErrorHandler("Password and Confirm Password do not match!",400));
}

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    university,
    course,
    dob,
    phone,
    username,
    gender,
    password,
    role: "User",
  });
  generateToken(user, "User Registered!", 200, res);
});

export const login=catchAsyncErrors(async(req,res,next)=>{
  const {email, password, role}=req.body;
  if (!email || !password || !role){
      return next(new ErrorHandler("Please provide all details",400));
  }
  const user = await User.findOne({email}).select("+password");
  if(!user){
      return next(new ErrorHandler("Invalid Password or Email!",400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid Password or Email!",400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  }
  generateToken(user, "Login Successfully!", 201, res);
});



export const universityAdminLogin=catchAsyncErrors(async(req,res,next)=>{
  const {email, password, role}=req.body;
  if (!email || !password || !role){
      return next(new ErrorHandler("Please provide all details",400));
  }
  const user = await User.findOne({email}).select("+password");
  if(!user){
      return next(new ErrorHandler("Invalid Password or Email!",400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid Password or Email!",400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler(`University Admin Not Found With This Role!`, 400));
  }
  generateToken(user, "Login Successfully!", 201, res);
});




export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const getUniversityAdminDetails = catchAsyncErrors(async (req, res, next) => {
  req.user = await User.find({"role":"UniversityAdmin"});
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});


export const addAvatar = catchAsyncErrors(async (req,res,next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Avatar Required!", 400));
  }
  const { avatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const id = req.body.id;
  // console.log(req.body.id);
  if(!avatar)
  {
    return next(new ErrorHandler("Please upload an image!", 400));
  }
  if(!id){
    return next(new ErrorHandler("Can't fetch user information", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Avatar To Cloudinary", 500)
    );
  }
  const updateData= {avatar: {
    public_id: cloudinaryResponse.public_id,
    url: cloudinaryResponse.secure_url,
  }};
  
    const updateUser = await User.findByIdAndUpdate(id,updateData,{
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      updateUser,
    });

});


export const adminRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, username, gender, password, confPassword } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !username ||
    !gender ||
    !password ||
    !confPassword
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  if (password !== confPassword){
    return next(new ErrorHandler("Password and Confirm Password do not match!",400));
}

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    username,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("userToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully.",
    });
});