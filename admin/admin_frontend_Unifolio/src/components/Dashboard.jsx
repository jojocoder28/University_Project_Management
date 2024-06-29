import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  // const {admin, setAdmin} = useContext(Context);
  // useEffect(() => {
  //   const fetchAppointments = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "http://localhost:4000/api/v1/appointment/getall",
  //         { withCredentials: true }
  //       );
  //       setAppointments(data.appointments);
  //     } catch (error) {
  //       setAppointments([]);
  //     }
  //   };
  //   fetchAppointments();
  // }, []);

  // const handleUpdateStatus = async (appointmentId, status) => {
  //   try {
  //     const { data } = await axios.put(
  //       `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
  //       { status },
  //       { withCredentials: true }
  //     );
  //     setAppointments((prevAppointments) =>
  //       prevAppointments.map((appointment) =>
  //         appointment._id === appointmentId
  //           ? { ...appointment, status }
  //           : appointment
  //       )
  //     );
  //     toast.success(data.message);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
     hello
    </>
  );
};

export default Dashboard;
