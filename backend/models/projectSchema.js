import mongoose from "mongoose";
import validator from "validator";

const projectSchema = new mongoose.Schema({
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
    colabRequest:[{
        type: String,
    }],
    supervisor:{
        type: String,
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
    requirement:[{
        type:String,
    }],
    languages:[{
        type: String,
    }],

    isClosed:{
        type: Boolean,
        required: true,
    },
    topic:{
        type: String,
    },
    deadline:{
        type:String,
    },
    treeStructure: {
        type: Object,
        // required: true,
    },
    isApproved:{
        type: Boolean,
    },
});

projectSchema.index({ projectName: 'text', description: 'text', topic: 'text' });

export const Project = mongoose.model("project", projectSchema);