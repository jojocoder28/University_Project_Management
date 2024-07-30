import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import backend_api from '../config';
import Sidebar from './Sidebar';


const University = () => {

  const { isAuthenticated, admin } = useContext(Context);
  const [university, setUniversity] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentUniversity, setCurrentUniversity] = useState(null);
  const [universityName, setUniversityName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [uniLocation, setUniLocation] = useState("");

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          backend_api+"api/v1/university/getall",
          {
            withCredentials: true,
          }
        );
        setUniversity(response.data.university);
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    };
    fetchUniversity();
  }, [isAuthenticated]);
//   if (!isAuthenticated) {
//     return <Navigate to={"/login"} />;
//   }
    document.title="University";

  const openModal = (university) => {
    setCurrentUniversity(university);
    setUniversityName(university.universityName);
    setAcronym(university.acronym);
    setUniLocation(university.uniLocation);
    document.getElementById('my_modal_3').showModal();
  };


  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        backend_api + "api/v1/university/update",
        {
          universityId: currentUniversity.universityId,
          universityName,
          acronym,
          uniLocation
        },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      // Update the university in the local state
      setUniversities((prev) =>
        prev.map((u) =>
          u.universityId === currentUniversity.universityId
            ? { ...u, universityName, acronym, uniLocation }
            : u
        )
      );
      document.getElementById('my_modal_3').close();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
    <Sidebar activeTab="Universities" />
    <div className="h-5 relative">
        {/* <h1>Universities</h1> */}
    </div>
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold py-10">All Universities</h2>
    </div>
    <div className='grid gap-2 justify-center p-5 '>
        {university && university.length > 0 ? (
          university.map((element) => {
            return (
                <div key={element.universityId} className="p-3">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-3">
                
                    {/* <img className="rounded-t-lg" src={element.avatar && element.avatar.url} alt="" /> */}
                    {/* <img className="rounded-t-lg" src="https://media.licdn.com/dms/image/C561BAQEK8pJA0beVZA/company-background_10000/0/1636948569415/university_of_calcutta_technology_campus_cover?e=2147483647&v=beta&t=n367FaUrHH5y4Iae2wHfu6L1n_A8EED5s5cNGMNd7ts" alt="" /> */}

                
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{element.universityId}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${element.universityName} (${element.acronym})`}</p>

                    <button className="btn" onClick={() => openModal(element)}>
                        Edit
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <form method="dialog" onSubmit={handleEdit}>
                          {/* if there is a button in form, it will close the modal */}
                          {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
                          <div className="flex flex-wrap -mx-3 mb-6">
                              <div className="w-full px-3 mb-6 md:mb-0">
                                  <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="universityId">
                                  University ID
                                  </label>
                                  <input onChange={(e) => setUniversityId(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="universityId" type="text" placeholder={element.universityId} disabled />
                                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                              </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                              <div className="w-full px-3">
                                  <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="universityName">
                                  University Name
                                  </label>
                                  <input value={universityName} onChange={(e) => setUniversityName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="universityName" type="text" placeholder={element.universityName} />
                              </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                              <div className="w-full px-3">
                                  <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="acronym">
                                  Acronym
                                  </label>
                                  <input value={acronym} onChange={(e) => setAcronym(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="acronym" type="text" placeholder={element.acronym}/> 
                              </div>
                          </div>
                          
                          <div className="flex flex-wrap -mx-3 mb-6">
                              <div className="w-full px-3">
                                  <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="uniLocation">
                                  Location
                                  </label>
                                  <input value={uniLocation} onChange={(e) => setUniLocation(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="uniLocation" type="text" placeholder={element.uniLocation}/>
                              
                              </div>
                          </div>
                          <button className="btn" type="submit">Update</button>
                        </form>
                      </div>
                    </dialog>
                </div>
            </div>
            </div>
            );
          })
        ) : (
          <h1>No Registered university Found!</h1>
        )}
    </div>

    </>
  )
}

export default University