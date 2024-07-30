import React, { useContext, useState } from "react";
import { BiSolidHome } from "react-icons/bi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { FaUniversity } from "react-icons/fa";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import backend_api from "../config";

const Sidebar = ({activeTab}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get(backend_api + "api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
  };
  const gotoAddUniversityPage = () => {
    navigateTo("/addUniversity");
  };
  const gotoUniversityPage = () => {
    navigateTo("/university");
  };
  const gotoAddNewUniversityAdmin = () => {
    navigateTo("/admin/adduniversityadmin");
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-center justify-center sm:w-screen w-full">
      <ul className="menu menu-horizontal lg:menu-horizontal sm:menu-vertical gap-2 rounded-box mt-6 bg-base-200 dark:bg-base-300">
        <li>
            <a onClick={gotoHomePage} className={`tooltip ${activeTab == "Home" ? "active" : ""}`}  data-tip="Home">
              <BiSolidHome className="text-2xl" />
            </a>
        </li>
        <li>
            <a onClick={gotoAddUniversityPage} className={`tooltip ${activeTab == "AddUniversity" ? "active" : ""}`}  data-tip="Add University">
              <FaUniversity className="text-2xl" />
            </a>
        </li>
        <li>
            <a onClick={gotoAddNewAdmin} className={`tooltip ${activeTab == "AddAdmin" ? "active" : ""}`}  data-tip="Add New Admin">
              <MdAddModerator className="text-2xl" />
            </a>
        </li>
        <li>
            <a onClick={gotoAddNewUniversityAdmin} className={`tooltip ${activeTab == "AddUniAdmin" ? "active" : ""}`}  data-tip="Add New University Admin">
              <IoPersonAddSharp className="text-2xl" />
            </a>
        </li>
        <li>
            <a onClick={gotoUniversityPage} className={`tooltip ${activeTab == "Universities" ? "active" : ""}`}  data-tip="All Universities">
              <AiFillMessage className="text-2xl" />
            </a>
        </li>
        <li>
            <a onClick={handleLogout} data-tip="Logout">
              <RiLogoutBoxFill className="text-2xl" />
            </a>  
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
