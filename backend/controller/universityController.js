import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { University } from "../models/universitySchema.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";

export const UniversityRegister = catchAsyncErrors(async (req, res, next) => {
    const { universityId, universityName, acronym } =
      req.body;
    if (
      !universityId || !universityName || !acronym
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
    });
    res.status(200).json({
        success: true,
        university,
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