import UserData from '../components/UserData'
import ProjectList from '../components/ProjectList'
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import React, { useContext, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
// const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          { withCredentials: true }
        );
        setUser(data.user);
        // console.log(data.user);
      } catch (error) {
        setUser([]);
      }
    };
    fetchUser();
  }, []);
    return (
        <>
            <div className="container mx-auto h-auto w-full">
                <div className="flex items-start justify-center">
                    <UserData 
                    fname={user.firstName} lname={user.lastName} role={user.role} 
                    location="Los Santos" university="Los Santos Public University"
                    />
                </div>
                <div className="divider"></div>
                <div className="flex gap-5 w-full justify-center items-center">
                    <h2 className="text-2xl font-semibold text-center my-4">Projects</h2>
                    <div className="flex justify-center">
                        <button className="btn btn-primary hover:bg-blue-200 dark:hover:bg-slate-900 shadow-md">Add Project</button>
                    </div>
                </div>
                <div className="flex w-full justify-center border-gray-700 rounded-md shadow-md">
                    <div className="max-w-3/5">
                        <ProjectList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
