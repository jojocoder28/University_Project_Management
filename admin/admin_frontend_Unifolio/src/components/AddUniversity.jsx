import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import backend_api from "../config.js";

const AddUniversity = ()=>{

    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [universityId, setUniversityId] = useState("");
    const [universityName, setUniversityName] = useState("");
    const [acronym, setAcronym] = useState("");
    const [uniLocation, setUniLocation] = useState("");

    const navigateTo = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                backend_api + "api/v1/university/register",
                { universityId, universityName, acronym, uniLocation },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
    
            // Handle the successful response
            toast.success(response.data.message);
            setIsAuthenticated(true);
            navigateTo("/");  // Ensure navigate is properly used
            // Reset form fields
            setUniversityId("");
            setUniversityName("");
            setAcronym("");
            setUniLocation("");
        } catch (error) {
            // Check if error.response exists
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };
    
      if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
      }

    return (
        <>
            <Sidebar activeTab="AddUniversity"/>

            <div className="min-h-screen flex justify-center py-2 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold py-10">Add University</h2>
                </div>
                <form className="w-full max-w-lg" onSubmit={handleRegistration}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="universityId">
                            University ID
                            </label>
                            <input value={universityId} onChange={(e) => setUniversityId(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="universityId" type="text" placeholder="1234"/>
                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="universityName">
                            University Name
                            </label>
                            <input value={universityName} onChange={(e) => setUniversityName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="universityName" type="text" placeholder="Abcd"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="acronym">
                            Acronym
                            </label>
                            <input value={acronym} onChange={(e) => setAcronym(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="acronym" type="text" placeholder="AB"/> 
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="uniLocation">
                            Location
                            </label>
                            <input value={uniLocation} onChange={(e) => setUniLocation(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="uniLocation" type="text" placeholder="123 street, Kol-700001"/>
                        
                        </div>
                    </div>
                    
                    <div className="flex justify-center py-6 items-center">
                    <button className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded items-center justify-center" type="submit">
                        Add University
                    </button>
                    </div>
                    <div className="py-2"></div>
                </form>
                </div>
            </div>
        </>
    )
}

export default AddUniversity
