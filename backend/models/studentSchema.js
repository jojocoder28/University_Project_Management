import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema({
    rollnumber:{
        type: String,
        required: true,
    },
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
        minLength: [validator.isEmail, "Please Provide A Valid Email"],
    },
    phone:{
        type:String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 digits"],
        maxLength: [10, "Phone Number Must Contain Exact 10 digits"],
    },
    university:{
        type:String,
        required: true,
    },
    institute:{
        type: String,
    },
    course:{
        type: String,
    },
    admissiondate:{
        type: String,
    },
    passoutyear:{
        type: Number,
    },
    avatar:{
        public_id: String,
        url: String,
    },
    colabRequest:[{
        type: String,
    }],
    projects:[{
        type: String,
    }],
    colab:[{
        type: String,
    }],
    languages:[{
        type: String,
    }],

});



export const Student = mongoose.model("student", studentSchema);