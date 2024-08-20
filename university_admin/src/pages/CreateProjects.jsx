import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../main';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import axios from "axios";
import { backend_api, fileupload_api } from '../config';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

const CreateProjects = () => {
    const navigateTo = useNavigate();
    const {admin, isAutheticated} = useContext(Context);
    const [requirement, setRequirement] = useState([]);
    const [date, setdate] = useState('');
    const [Name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [supervisor, setSupervisor] = useState(admin.email);
    const [email, setEmail] = useState(admin.email);
    const [university, setUniversity] = useState(admin.university);
    

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleProject = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          backend_api+"api/v1/project/create/new",
          { Name, description, requirement, supervisor, email, university,today, date },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          navigateTo("/");
          setName("");
          setdescription("");
          setSupervisor("");
        });
    } catch (error) {
      toast.error(error.response);
      console.log(error)
    }
  }


  const handleRequirementChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
        setRequirement([...requirement, value]);
    } else {
        setRequirement(requirement.filter((item) => item !== value));
    }
};
  return (
    <>
        <div className="flex flex-col items-center justify-start pb-4">
            <NavBar activeTab="Projects" />
        </div>
        <div className="min-h-screen w-screen flex justify-center py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold py-10">Create A New <span className='text-teal-500 animate-pulse'>Project</span></h2>
              </div>
              <form className="w-full max-w-lg" onSubmit={handleProject}>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-projectName">
                      Project Name <span className="text-red-700">*</span>
                    </label>
                    <input value={Name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-Name" type="text" placeholder="Name of your project"/>
                    
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
                      Project Description <span className="text-red-700">*</span>
                    </label>
                    <textarea value={description} onChange={(e) => setdescription(e.target.value)} className="appearance-none h-24 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" type="text" placeholder="Describe your project in few words"/>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-requirement">
                    Course Requirement <span className="text-red-700">*</span>
                </label>
                <div className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <div>
                        <input
                            type="checkbox"
                            id="MCA"
                            value="MCA"
                            checked={requirement.includes("MCA")}
                            onChange={handleRequirementChange}
                        />
                        <label htmlFor="MCA" className="ml-2">MCA</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="BTech"
                            value="BTech"
                            checked={requirement.includes("BTech")}
                            onChange={handleRequirementChange}
                        />
                        <label htmlFor="BTech" className="ml-2">BTech</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="BSc"
                            value="BSc"
                            checked={requirement.includes("BSc")}
                            onChange={handleRequirementChange}
                        />
                        <label htmlFor="BSc" className="ml-2">BSc</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="MTech"
                            value="MTech"
                            checked={requirement.includes("MTech")}
                            onChange={handleRequirementChange}
                        />
                        <label htmlFor="MTech" className="ml-2">MTech</label>
                    </div>
                    {/* Add more checkboxes as needed */}
                </div>
            </div>
        </div>
                 
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-date">
                      Project Deadline <span className="text-red-700">*</span>
                    </label>
                    <input value={date} onChange={(e) => setdate(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-date" type="date" placeholder="DD-MM-YYYY" min={today}/>
                    
                  </div>
                </div>
                
                <div className="flex justify-center pt-2 items-center">
                  <button className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded items-center justify-center" type="submit">
                    Create Project
                  </button>
                </div>
              </form>
            </div>
        </div>
    </>
  )
}

export default CreateProjects