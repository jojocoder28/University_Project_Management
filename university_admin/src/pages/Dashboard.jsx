import React, { useContext, useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import AdminData from '../components/AdminData'
import { toast } from "react-toastify";
import axios from "axios";
import QuickActions from '../components/QuickActions'
import Tabs from '../components/Tabs'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loading from '../components/Loading';
import backend_api from '../config';

function Dashboard() {
  const navigateTo = useNavigate();

    const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);
    const [projects, setProject] = useState([]);
    const [numProjects, setNumprojects] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState("");
    const [studentLength, setStudentlength] = useState("");

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
          setStudentlength(response.data.user.length);
        //   console.log(response.data.user);
        } catch (error) {
            console.log(error);
        }
        finally{
          setIsLoading(false);
        }
      };
      fetchUser();
    },[isAuthenticated]);

   
    useEffect(() => {
      const fetchProject = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            backend_api+"api/v1/project/supervisor/getall",
            {
              withCredentials: true,
            }
          );
          if(response.data.project.length!=0){
          setProject(response.data.project);
          setNumprojects(response.data.project.length);
      }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
        finally{
          setIsLoading(false);
        }
      };
      fetchProject();
  }, [isAuthenticated]);


    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
      }
    return (
      <>
      {isLoading ? (
        <Loading />
      ) : (
        <><div className="flex flex-col items-center justify-start pb-4">
              <NavBar activeTab="Home" />
            </div><AdminData admin={admin} numProjects={numProjects} studentlength={studentLength}/><QuickActions /><Tabs /></>
      )}
        </>
    )
}

export default Dashboard;
