import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {backend_api} from "../config";

const UpdateStudentDetails = ({ email, name, onUpdateSuccess }) => {
    const [rollnumber, setRollnumber] = useState("");
    const [admissiondate, setadmissiondate] = useState("");
    const [emailState, setEmailState] = useState(email);
    const navigateTo = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                backend_api + "api/v1/university/user/update",
                { email: emailState, admissiondate, rollnumber },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            toast.success(response.data.message);
            onUpdateSuccess(); // Notify the parent component of success
            setRollnumber("");
            setadmissiondate("");
            setEmailState("");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center pb-5">
                <p className="font-mono text-4xl text-yellow-50">{name}</p>
                <div>
                    <h2 className="text-center text-3xl font-extrabold py-5">Update Student Details</h2>
                </div>
                <form className="w-full max-w-lg" onSubmit={handleUpdate}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-rollnumber">
                                Roll Number
                            </label>
                            <input value={rollnumber} onChange={(e) => setRollnumber(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-rollnumber" type="text" placeholder="university roll number" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-admissiondate">
                                Admission Date
                            </label>
                            <input value={admissiondate} onChange={(e) => setadmissiondate(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-admissiondate" type="date" />
                        </div>
                    </div>
                    <div className="flex justify-center pt-2 items-center">
                        <button className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded items-center justify-center" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateStudentDetails;
