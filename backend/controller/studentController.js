import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Student } from "../models/studentSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken, generateTokenStudent } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const studentRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, username, rollnumber, university, institute, course, admissiondate, passoutyear, avatar } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !username ||
    !rollnumber ||
    !university
  ) {
    console.log(firstName+" "+lastName+" "+email+" "+phone+" "+username+" "+rollnumber+" "+university)
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await Student.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Student already Registered!", 400));
  }

  const student = await Student.create({
    rollnumber,
    username,
    firstName,
    lastName,
    email,
    phone,
    university,
    institute,
    course,
    admissiondate,
    passoutyear,
    avatar,
    
  });
  generateTokenStudent(student, "Student Registered!", 200, res);
});

export const studentLogin=catchAsyncErrors(async(req,res,next)=>{
    const {email}=req.body;
    if (!email){
        return next(new ErrorHandler("Please provide all details",400));
    }
    const student = await Student.findOne({email});
    if(!student){
        return next(new ErrorHandler("Invalid Password or Email!",400));
    }
    
    generateTokenStudent(student, "Login Successfully!", 201, res);
  });

export const getStudentDetails = catchAsyncErrors(async (req, res, next) => {    
    const student = req.student;
    // console.log(req.student);
    res.status(200).json({
        success: true,
        student,
    });
});

