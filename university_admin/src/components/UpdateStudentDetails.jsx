import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";


const UpdateStudentDetails = (props) => {
    const [rollnumber, setRollnumber] = useState("");
    const [admissiondate, setadmissiondate] = useState("");
    const [email, setemail] = useState(props.email);
  
    const navigateTo = useNavigate()
    
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        await axios
          .post(
            "http://localhost:4000/api/v1/university/user/update",
            { email, admissiondate, rollnumber },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            toast.success(res.data.message);
            navigateTo("/students");
            setRollnumber("");
            setadmissiondate("");
            setemail("");
  
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  return (
    <>
        
            <div className="flex flex-col justify-center items-center pb-5">
            <p className="font-mono text-4xl text-yellow-50">{props.name}</p>
              <div>
                <h2 className="text-center text-3xl font-extrabold py-5">Update Student Details</h2>
              </div>
              <form className="w-full max-w-lg" onSubmit={handleUpdate}>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-rollnumber">
                      Roll Number
                    </label>
                    <input value={rollnumber} onChange={(e) => setRollnumber(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-rollnumber" type="test" placeholder="university roll number"/>
                    
                  </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-admissiondate">
                      admissiondate
                    </label>
                    <input value={admissiondate} onChange={(e) => setadmissiondate(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-admissiondate" type="date"/>
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
  )
}

export default UpdateStudentDetails