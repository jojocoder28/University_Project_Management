import React from 'react';
import { PiStudent } from "react-icons/pi";
import { LuPackage } from "react-icons/lu";


function AdminData(props) {
    const name=props.admin.firstName + " " + props.admin.lastName;
    const email=props.admin.email;
    const university=props.admin.university;
    const avatar=props.admin.avatar && props.admin.avatar.url;
    let numProjects = 0;
    
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
                                <button className='text-white btn-outline'>Edit</button>
                                </div>
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
                    <div className="stat-value text-primary text-xl md:text-2xl">{numProjects}</div>
                    <div className="stat-desc">21% more than last month</div>
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
                    <div className="stat-title">Page Views</div>
                    <div className="stat-value text-secondary text-xl md:text-2xl">2.6M</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

            </div>
        </>
    );
}

export default AdminData;
