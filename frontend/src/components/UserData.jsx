/* eslint-disable react/prop-types */
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoSchoolSharp } from "react-icons/io5";

function UserData(props) {
    return (
        <div className="flex flex-col lg:flex-row justify-between mx-5 my-10 p-5 rounded-lg w-full">
            <div className="flex flex-row userData mb-5 lg:mb-0">
                <div className="avatar">
                    <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-slate-50">
                        <img 
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </div>
                <div className="flex flex-col ml-5 gap-3">
                    <h2 className="text-3xl font-semibold">{props.name}</h2>
                    <div className="badge badge-md badge-outline overflow-hidden">
                        {props.role}
                    </div>
                    <div className="location flex items-center">
                        <HiOutlineLocationMarker />
                        <h4 className="text-md ml-2">{props.location}</h4>
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
                    <div className="stat-value overflow-hidden">10</div>
                    <div className="stat-desc text-wrap">Latest: 10th Jan 2024</div>
                </div>
                <div className="stat">
                    <div className="stat-title text-wrap text-xl">Pending Projects</div>
                    <div className="stat-value overflow-hidden">2</div>
                    <div className="stat-desc text-wrap">↗︎ Accepance Rate: 69%</div>
                </div>
            </div>
        </div>
    );
}

export default UserData;
