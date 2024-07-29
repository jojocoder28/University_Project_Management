import { LuPackage } from "react-icons/lu";
import Modal from "./Modal";
import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import backend_api from "../config.js";

function AdminData(props) {
    const [email, setEmail]=useState(props.admin.email);
    const [university, setUniversity]=useState(props.admin.university);
    // let [numProjects, setNumprojects] = useState(0);
    const [name, setName] = useState(props.admin.firstName + " " + props.admin.lastName);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatar, setAvatar] = useState(props.admin.avatar && props.admin.avatar.url);
    const [avatarPreview, setAvatarPreview] = useState("");
    const {admin, setAdmin} = useContext(Context);
    const [id, setId] = useState(admin._id);
    const navigateTo = useNavigate();
    // console.log(user._id);
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
          formData.append("avatar", avatar);
          formData.append("id",id);
          await axios
            .post(backend_api+"api/v1/user/addavatar" || "http://localhost:4000/api/v1/user/addavatar", formData, {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              toast.success(res.data.message);
            //   setIsAuthenticated(true);
              setIsModalOpen(false);
              navigateTo("/");
            });
        } catch (error) {
          toast.error(error.response);
        //   console.log(error)
        }
      };
    
    return (
        <>
            <div className="stats shadow flex flex-col md:flex-row gap-4 p-4">

                <div className="stat flex-1">
                    <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 md:w-24 rounded-full">
                                <img src={avatar || 'blankAvatar.jpg'} alt="Admin" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center pt-3">
                                <button className='text-white btn-outline' onClick={openModal}>Edit</button>
                        </div>
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
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">

                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>

                                            <p className="text-sm overflow-hidden text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs overflow-hidden text-gray-500 dark:text-gray-400">Webp, PNG or JPG</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" onChange={handleAvatar}/>
                                    </label>
                                </div> 
                                <div className="flex justify-center items-center pt-5">
                                    <button className="btn btn-primary hover:bg-blue-200 hover:text-white border-none dark:hover:bg-slate-900 shadow-md">Update Image</button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                    <div className="text-xl md:text-3xl">{name}</div>
                    <div className="text-lg md:text-2xl text-gray-500">{university}</div>
                    <div className="text-sm md:text-lg text-secondary">{email}</div>
                </div>

                <div className="stat flex-1">
                    <div className="stat-figure text-primary">
                        <LuPackage size={40} />
                    </div>
                    <div className="stat-title">Total Projects</div>
                    <div className="stat-value text-primary text-xl md:text-2xl">{props.numProjects}</div>
                    <div className="stat-desc">Avaiable</div>
                </div>

                <div className="stat flex-1">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z">
                            </path>
                        </svg>
                    </div>
                    <div className="stat-title">Total Students</div>
                    <div className="stat-value text-secondary text-xl md:text-2xl">{props.studentlength}</div>
                    <div className="stat-desc">Students from {university}</div>
                </div>

            </div>
        </>
    );
}

export default AdminData;
