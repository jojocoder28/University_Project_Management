import { context } from "@react-three/fiber";
import React, {useState, useEffect, useContext} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";

const ProjectList = (props) => {
    const navigateTo = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    const gotoProjectPage = async (projectId) => {
        isAuthenticated ? navigateTo(`/project/${projectId}`) :  navigateTo(`/login`);        
    }
    
    return (
        <>
            <div className="overflow-auto p-4">
                <div className="max-w-3/5 rounded-lg shadow-lg border border-slate-700 overflow-auto">
                    <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="border-b border-slate-700">
                        <th className="px-6 py-4 w-1/5 text-left">Project Name</th>
                        <th className="px-6 py-4 w-1/5 text-left">Supervisor Email</th>
                        <th className="px-6 py-4 w-2/5 text-left">Description</th>
                        <th className="px-6 py-4 w-1/5 text-left">Tags</th>
                        {props.view ? (
                            <th className="px-6 py-4 w-1/5">Creator</th>
                        ):(
                            <th className="px-6 py-4 w-1/10">Status</th>
                        )}
                        </tr>
                    </thead>
                    <tbody>
                        {props.projects.map((project, index) => (
                            <tr key={index} className="cursor-pointer transition-color duration-300 hover:bg-gray-200 dark:hover:bg-slate-900" 
                            onClick={() => gotoProjectPage(project._id)}>
                            <td className="px-6 py-4">{project.projectName}</td>
                            <td className="px-6 py-4">{project.supervisor}</td>
                            <td className="px-6 py-4 overflow-auto gap-2">
                                {project.description}
                            </td>
                            <td className="px-6 py-4 overflow-auto gap-2">

                                {project.languages ? (
                                    project.languages.map((lang, index) => (
                                        <ul key={index} className="list-disc list-inside">{
                                            lang.split(',').map((tag,i) =>(
                                            <li key={i} className="overflow-hidden">{tag}
                                            </li>
                                            ))
                                            }
                                            </ul>
                                    ))):(<div></div>)}
                            </td>
                            {!props.view ? (
                            <td className="px-6 py-4">
                            {!project.isClosed ? (
                                <div className="badge badge-neutral dark:bg-green-800 bg-green-500 overflow-hidden">Open</div>):(<div className="badge badge-neutral bg-red-400 dark:bg-red-700 overflow-hidden">Closed</div>)
                            }
                            </td>):(
                                <td className="px-6 py-4"><a href={"/profile/"+project.creatorEmail} className="hover:text-blue-400">{project.creatorEmail}</a></td>
                            )}
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProjectList
