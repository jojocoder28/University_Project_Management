import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import StudentCard from "../components/StudentCard";
import backend_api from "../config";

const Students = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState("");
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    useEffect(() => {
      const fetchUser = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            backend_api+"api/v1/university/student/getall",
            {
              withCredentials: true,
            }
          );
          setStudents(response.data.user);
        //   console.log(response.data.user);
        } catch (error) {
            console.log(error);
        }
        finally{
          setIsLoading(false);
        }
      };
      fetchUser();
    },[students]);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
      }
    //   console.log(students);

  return (
    <>
    <div className="items-center justify-start pb-4">
        <NavBar activeTab="Students" />
        </div>
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Student List</h1>
      <div className="flex flex-wrap justify-center">
        {students && students.length > 0 ? (
        students.map((student, index) => (
          <StudentCard key={index} student={student} />
        ))):(
            <p>No Students in this University</p>
        )}
      </div>
    </div>
    </>
  )
}

export default Students