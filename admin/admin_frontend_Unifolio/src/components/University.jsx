import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";


const University = () => {

  const { isAuthenticated, admin } = useContext(Context);
    const [university, setUniversity] = useState("");
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        // setIsLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/v1/university/getall",
          {
            withCredentials: true,
          }
        );
        setUniversity(response.data.university);
      } catch (error) {
        console.log(error);
      }finally{
        // setIsLoading(false);
      }
    };
    fetchUniversity();
  });
//   if (!isAuthenticated) {
//     return <Navigate to={"/login"} />;
//   }
    document.title="University";

  return (
    <>
    <div className="h-5 relative">
        {/* <h1>Universities</h1> */}
    </div>
    <div className='grid justify-center p-5 '>
        {university && university.length > 0 ? (
          university.map((element) => {
            return (
                <div className="p-3">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-3">
                
                    {/* <img className="rounded-t-lg" src={element.avatar && element.avatar.url} alt="" /> */}
                    <img className="rounded-t-lg" src="https://media.licdn.com/dms/image/C561BAQEK8pJA0beVZA/company-background_10000/0/1636948569415/university_of_calcutta_technology_campus_cover?e=2147483647&v=beta&t=n367FaUrHH5y4Iae2wHfu6L1n_A8EED5s5cNGMNd7ts" alt="" />

                
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{element.universityId}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${element.universityName} (${element.acronym})`}</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
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