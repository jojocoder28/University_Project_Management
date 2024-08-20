import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { University } from "../models/universitySchema.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";
import { User } from "../models/userSchema.js";

export const UniversityRegister = catchAsyncErrors(async (req, res, next) => {
    const { universityId, universityName, acronym, uniLocation } =
      req.body;
    // console.log(universityId, universityName, acronym, uniLocation);
    if (
      !universityId || !universityName || !acronym || !uniLocation
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    const isRegistered = await University.findOne({ universityId });
    if (isRegistered) {
      return next(new ErrorHandler("University already Registered!", 400));
    }
  
    const university = await University.create({
      universityId,
      universityName,
      acronym,
      uniLocation
    });
    res.status(200).json({
        success: true,
        university,
      });
  });

  export const universityAdminRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, university, phone, username, gender, password, confPassword } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !username ||
      !gender ||
      !university ||
      !password ||
      !confPassword
    ) {
      // console.log(firstName+" "+lastName+" "+email+" "+phone+" "+username+" "+gender+" "+password+" "+confPassword+" "+university)
      // console.log(req.body);
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    if (password !== confPassword){
      return next(new ErrorHandler("Password and Confirm Password do not match!",400));
  }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("University Admin already Registered!", 400));
    }
  
    const user = await User.create({
      firstName,
      lastName,
      email,
      university,
      phone,
      username,
      gender,
      password,
      role: "UniversityAdmin",
    });
    res.status(200).json({
      success: true,
      user,
    });
  });

  export const getUniversityDetails = catchAsyncErrors(async (req, res, next) => {
    req.university = await University.find();
    const university = req.university;
    res.status(200).json({
      success: true,
      university,
    });
  });

  export const getStudentDetails = catchAsyncErrors(async (req, res, next) => {
    const uni=req.user.university;
    const user=await User.find({"university":uni, "role":"User"});
    res.status(200).json({
      success: true,
      user,
    });
  });
