import mongoose from 'mongoose';
const { Schema } = mongoose

const universitySchema = new Schema(
    {
        universityId:{
            type: String,
            required: true,
            minLength: [1, "Invalid University ID"]
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
        uniLocation:String,
        projects:[{
            projectId: String,
            isApproved: Boolean
        }],
        avatar:{
            public_id: String,
            url: String,
        }
    }
);

export const University = mongoose.model("university", universitySchema);