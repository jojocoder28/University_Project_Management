import mongoose from "mongoose";
import validator from "validator";

const projectSchema = new mongoose.Schema({
    projectId:{
        type: String,
        required: true,
    },
    projectName:{
        type: String,
        required: true,
        minLength: [5, "Project Name Must Contain At Least 5 Characters"],
    },
    description:{
        type: String,
    },
    
    creatorEmail:{
        type: String,
        required: true,
        minLength: [validator.isEmail, "Please Provide A Valid Email"],
    },
    colabEmail:[{
        type: String,
        minLength: [validator.isEmail, "Please Provide A Valid Email"],
    }],
    
    university:{
        type:String,
        required: true,
    },
    creationDate:{
        type: String,
        required: true,
    },
    files:[{
        public_id: String,
        url: String,
    }],
    languages:[{
        type: String,
    }],
    isApproved:{
        type: Boolean,
        required: true,
    },
    topic:[{
        type: String,
    }],

});



export const Project = mongoose.model("project", projectSchema);