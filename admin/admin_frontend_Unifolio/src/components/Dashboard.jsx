import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  // const {admin, setAdmin} = useContext(Context);
  
  document.title="Home";

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
    <div className="h-5 relative"></div>
     hello
    </>
  );
};

export default Dashboard;
