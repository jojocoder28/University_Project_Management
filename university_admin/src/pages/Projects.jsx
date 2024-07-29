import React, {useState, useEffect, useContext} from "react";
import { Context } from "../main";
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import backend_api from '../config.js';
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import NavBar from "../components/NavBar.jsx";

const Projects = () => {
    document.title = `Projects`;
    const navigateTo = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    const gotoProjectPage = async (projectId) => {
        isAuthenticated ? navigateTo(`/project/${projectId}`) :  navigateTo(`/login`);        
    }
    const [projects, setProject] = useState([]);
    const [numProjects, setNumprojects] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
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

  return (
    <>
    {isLoading ? (
      <Loading/>):(
            <><div className="items-center justify-start pb-4">
                      <NavBar activeTab="Projects" />
                  </div>
          <h1 className="uppercase font-bold flex container justify-center items-center">All Projects</h1>
          <div className="overflow-auto p-4">
                          <div className="max-w-3/5 rounded-lg shadow-lg border border-slate-700 overflow-auto">
                              <table className="min-w-full table-fixed">
                                  <thead>
                                      <tr className="border-b border-slate-700">
                                          <th className="px-6 py-4 w-1/5 text-left">Project Name</th>
                                          <th className="px-6 py-4 w-1/5 text-left">Creator Email</th>
                                          <th className="px-6 py-4 w-2/5 text-left">Description</th>
                                          <th className="px-6 py-4 w-1/5 text-left">Tags</th>
                                          <th className="px-6 py-4 w-1/10">Status</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {projects.map((project, index) => (
                                          <tr key={index} className="cursor-pointer transition-color duration-300 hover:bg-gray-200 dark:hover:bg-slate-900"
                                              onClick={() => gotoProjectPage(project.projectId)}>
                                              <td className="px-6 py-4">{project.projectName}</td>
                                              <td className="px-6 py-4">{project.creatorEmail}</td>
                                              <td className="px-6 py-4 overflow-auto gap-2">
                                                  {project.description}
                                              </td>
                                              <td className="px-6 py-4 overflow-auto gap-2">

                                                  {project.languages ? (
                                                      project.languages.map((lang, index) => (
                                                          <ul key={index} className="list-disc list-inside">{lang.split(',').map((tag, i) => (
                                                              <li key={i} className="overflow-hidden">{tag}
                                                              </li>
                                                          ))}
                                                          </ul>
                                                      ))) : (<div></div>)}
                                              </td>

                                              <td className="px-6 py-4">
                                                  {project.isApproved ? (
                                                      <div className="badge badge-neutral dark:bg-green-800 bg-green-500 overflow-hidden">Approved</div>) : (<div className="badge badge-neutral bg-yellow-400 dark:bg-yellow-700 overflow-hidden">Pending</div>)}
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      </div></>
      )}
        </>
  )
}

export default Projects