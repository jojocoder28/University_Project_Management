import UserData from '../components/UserData'
import ProjectList from '../components/ProjectList'
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import React, { useContext, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    document.title="Dashboard";
const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const {user, setUser} = useContext(Context);
  // const [student, setStudent] = useState([]);
  // const email=user.email;
  // console.log("user = ",user)
  useEffect(() => {
    // const loginStudent = async () => {
    //   await axios
    //     .post(
    //       "http://localhost:4000/api/v1/student/login",
    //       {email},
    //       {
    //         withCredentials: true,
    //         headers: { "Content-Type": "application/json" },
    //       }
    //     );
    // }
    // loginStudent();
    // const fetchStudent = async () => {
    //   try {
    //     const { data } = await axios.get(
    //       "http://localhost:4000/api/v1/student/me",
    //       { withCredentials: true }
    //     );
    //     setStudent(data.student);
    //     // console.log(data);
    //   } catch (error) {
    //     setStudent([]);
    //   }
    // };
    // fetchStudent();
  }, []);

    let numProjects = 0;
    if(user.projects){
      numProjects=user.projects.length;
    }
    return (
        <>
            <div className="container mx-auto h-auto w-full">
                <div className="flex items-start justify-center">
                    <UserData 
                    fname={user.firstName} lname={user.lastName} role="User"
                    course={user.course} university={user.university} numProjects={numProjects}
                    />
                </div>
                <div className="divider"></div>
                <div className="flex gap-5 w-full justify-center items-center">
                    <h2 className="text-2xl font-semibold text-center my-4">Projects</h2>
                    <div className="flex justify-center">
                        <button className="btn btn-primary hover:bg-blue-200 dark:hover:bg-slate-900 shadow-md">Add Project</button>
                    </div>
                </div>
                {numProjects!==0 ? (<div className="flex w-full justify-center border-gray-700 rounded-md shadow-md">
                    <div className="max-w-3/5">
                        <ProjectList
                        projects={user.projects}
                        />
                    </div>
                </div>):(<div className="flex w-full justify-center border-gray-700 rounded-md shadow-md">
                    <div className="max-w-3/5">
                        No projects
                    </div>
                </div>)}
                
            </div>
        </>
    )
}

export default Dashboard
