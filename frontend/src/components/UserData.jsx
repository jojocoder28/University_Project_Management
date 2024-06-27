/* eslint-disable react/prop-types */
import { RiEditBoxLine } from "react-icons/ri";
import { IoSchoolSharp } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa6";
import Modal from "./Modal";
import { RiImageEditFill } from "react-icons/ri";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import { Avatar, Badge } from "@material-tailwind/react";

function UserData(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const navigateTo = useNavigate();
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(file);
        };
    };


    const handleAddAvatar = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("docAvatar", docAvatar);
          await axios
            .post("http://localhost:4000/api/v1/user/addavatar", formData, {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              toast.success(res.data.message);
              setIsAuthenticated(true);
              navigateTo("/");
            });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };


    return (
        <div className="flex flex-col lg:flex-row justify-between mx-5 my-10 p-5 rounded-lg w-full">
            <div className="flex flex-row userData mb-5 lg:mb-0">
                <div class="relative">
                    <img class="w-20 h-20 rounded-full" src="blankAvatar.jpg" alt=""/>
                    <div className="flex justify-center items-center">
                    <button className="flex bg-slate-800 w-full lg:mx-4 text-sm py-1 justify-center items-center rounded-lg mt-4 sm:mx-0 md:mx-0" onClick={openModal}> Edit </button>
                    </div>
                </div>
                {/* <button onClick={openModal}>
                    
                </button> */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <form onSubmit={handleAddAvatar}>
                            <h2 className="text-xl font-semibold pb-3 flex justify-center items-center">Upload Image</h2>
                        <div className="flex justify-center items-center">
                            <img className="h-48 "
                                src={
                                avatarPreview ? `${avatarPreview}` : "/blankAvatar.jpg"
                                }
                                alt="Avatar"
                            />
                        </div>
                        
                        <div className="flex items-center justify-center w-full px-3 pt-5">
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="text-sm overflow-hidden text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs overflow-hidden text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> 

                        <div className="flex justify-center items-center pt-5">
                            <button className="btn btn-primary hover:bg-blue-200 dark:hover:bg-slate-900 shadow-md">Update Image</button>
                        </div>
                    </form>
                </Modal>
                
                <div className="flex flex-col ml-5 gap-3">
                    <h2 className="text-3xl font-semibold">{props.fname} {props.lname}</h2>
                    <div className="badge badge-md badge-outline overflow-hidden">
                        {props.role}
                    </div>
                    <div className="location flex items-center">
                        <FaBookOpen />
                        <h4 className="text-md ml-2">{props.course}</h4>
                    </div>
                    <div className="university flex items-center">
                        <IoSchoolSharp />
                        <h4 className="text-md ml-2">{props.university}</h4>
                    </div>
                </div>
            </div>

            <div className="flex stats stats-vertical lg:stats-horizontal lg:space-x-5 shadow">
                <div className="stat">
                    <div className="stat-title text-xl">Projects</div>
                    <div className="stat-value overflow-hidden">{props.numProjects}</div>
                    <div className="stat-desc text-wrap">Latest: 10th Jan 2024</div>
                </div>
                <div className="stat">
                    <div className="stat-title text-wrap text-xl">Pending</div>
                    <div className="stat-value overflow-hidden">{props.numProjects}</div>
                    <div className="stat-desc text-wrap">↗︎ Accepance Rate: 69%</div>
                </div>
            </div>
        </div>
    );
}

export default UserData;
