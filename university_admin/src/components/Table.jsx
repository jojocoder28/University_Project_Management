import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {backend_api} from '../config.js';
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import axios from "axios";
import '../App.css';

function Table({ title, th }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(Context);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    backend_api + "api/v1/project/supervisor/getall/notapproved",
                    { withCredentials: true }
                );
                if (response.data.project.length !== 0) {
                    setProjects(response.data.project);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, [isAuthenticated]);

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
            // console.log(response.data.user)
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
      },[isAuthenticated]);

    return (
        <div className="overflow-x">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>{th[0]}</th>
                        <th>{th[1]}</th>
                        <th>{th[2]}</th>
                    </tr>
                </thead>
                <tbody>
                    {title=='Project' ? (

                        projects.map((project, index) => (
                            <tr key={project.projectId}> 
                                <th>{index + 1}</th>
                                <td>{project.projectName}</td> 
                                <td>{project.description}</td> 
                                <td>{project.creatorEmail}</td> 
                            </tr>
                        ))
                    ):(
                        students.map((student, index) => (
                            <tr key={student.email}> 
                                <th>{index + 1}</th>
                                <td>{student.firstName+" "+student.lastName}</td> 
                                <td>{student.course}</td> 
                                <td>{student.username}</td> 
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
