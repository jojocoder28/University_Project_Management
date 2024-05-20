import mongoose from 'mongoose';
const { Schema } = mongoose

const universitySchema = new Schema(
    {
        universityId:{
            type: String,
            required: true,
            minLength: [2, "Invalid University ID"]
        },
        universityName:{
            type: String,
            required: true,
            minLength: [5, "Please give full name of University"]
        },
        acronym:{
            type: String,
            minLength: [2, "Invalid Acronym"]
        },
        location:String,
        projects:[{
            projectId: String,
            required: true,
            isApproved: Boolean
        }]
    }
);