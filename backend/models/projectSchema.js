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
        validate: [validator.isEmail, "Please Provide A Valid Email"],
    },
    colabEmail:[{
        type: String,
        validate: [validator.isEmail, "Please Provide A Valid Email"],
    }],
    supervisor:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email"],
    },
    university:{
        type:String,
        required: true,
    },
    creationDate:{
        type: String,
        required: true,
    },
    files:[{
        type: Object,
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
    treeStructure: {
        type: Object,
        // required: true,
    },

});



export const Project = mongoose.model("project", projectSchema);