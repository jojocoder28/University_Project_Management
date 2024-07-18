import React from 'react'
import { PiStudent } from "react-icons/pi";
import { LuPackage } from "react-icons/lu";

function AdminData() {
    return (
        <>
            <div className="stats-horizontal sm:stats h-full sm:h-auto shadow">

                <div className="stat">
                        <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        </div>
                        <div className="text-3xl">Admin Name</div>
                        <div className="text-lg sm:text xl text-gray-500 sm:text-2xl">University of Sandeshkhali</div>
                        <div className="text-base sm:text-lg text-secondary">31 tasks remaining</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-primary">
                        <LuPackage size={40} />
                    </div>
                    <div className="stat-title">Total Projects</div>
                    <div className="stat-value text-primary">25</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    </div>
                    <div className="stat-title">Page Views</div>
                    <div className="stat-value text-secondary">2.6M</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>
            </div>
        </>
    )
}

export default AdminData
