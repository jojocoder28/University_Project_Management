import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { backend_api } from '../config.js';
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';

const ProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    document.title = `Project ${projectId}`;
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useContext(Context);
    const [tree, setTree] = useState([]);
    const [expandedDirs, setExpandedDirs] = useState({});

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${backend_api}api/v1/project/find/${projectId}`,
                    {
                        withCredentials: true,
                    }
                );
                if (response.data.project.length !== 0) {
                    setProject(response.data.project);
                    setTree(JSON.parse(response.data.project.treeStructure));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (!isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    const gotoFileUpload = () => {
        navigate(`/project/${projectId}/fileupload`);
    };

    const toggleDirectory = (path) => {
        setExpandedDirs((prevState) => ({
            ...prevState,
            [path]: !prevState[path]
        }));
    };

    const renderTree = (node, path = '') => {
        if (!node.children) return null;

        return (
            <ul>
                {node.children.map((child, index) => {
                    const childPath = `${path}/${child.name}`;
                    return (
                        <li key={index}>
                            {child.isDirectory ? (
                                <>
                                    <div onClick={() => toggleDirectory(childPath)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                        {expandedDirs[childPath] ? <FaFolderOpen /> : <FaFolder />}
                                        <strong style={{ marginLeft: '5px' }}>{child.name}</strong>
                                    </div>
                                    {expandedDirs[childPath] && renderTree(child, childPath)}
                                </>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FaFile />
                                    <a href={`#`} style={{ marginLeft: '5px' }}>{child.name}</a>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{project.projectName}</h1>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Supervisor</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{project.supervisor}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Description</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{project.description}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Tags</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex gap-2">
                                                {project.languages.map((lang, index) => (
                                                    <div key={index} className="badge badge-neutral overflow-hidden">{lang}</div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Status</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {project.isApproved ? (
                                                <div className="badge badge-neutral dark:bg-green-800 bg-green-500 overflow-hidden">Approved</div>
                                            ) : (
                                                <div className="badge badge-neutral bg-yellow-400 dark:bg-yellow-700 overflow-hidden">Pending</div>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Project Files</h2>
                        {tree && tree.children && tree.children.length > 0 ? (
                            renderTree(tree)
                        ) : (
                            <button
                                onClick={gotoFileUpload}
                                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Upload Files
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectPage;
