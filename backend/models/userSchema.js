import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minLength: [5, "Username Must Contain At Least 5 Characters"],
    },
    firstName:{
        type: String,
        required: true,
        minLength: [2, "First Name Must Contain At Least 2 Characters"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [2, "Last Name Must Contain At Least 2 Characters"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email"],
    },
    phone:{
        type:String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 digits"],
        maxLength: [10, "Phone Number Must Contain Exact 10 digits"],
    },
    university:{
        type:String,
        // required: true,
    },
    dob:{
        type: String,
    },
    gender:{
        type:String,
        required: true,
        enum: ["Male","Female","Other"],
    },
    role: {
        type: String,
        required: [true, "User Role Required!"],
        enum: ["User", "UniversityAdmin", "Admin"],
      },
    password:{
        type:String,
        required: true,
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
        select: false,
    },
    avatar:{
        public_id: String,
        url: String,
    },
    

});


userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken= function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    })
};

export const User = mongoose.model("user", userSchema);