// src/pages/ProjectPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { backend_api } from '../config.js';
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import ZipUpload from './FileUpload.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import TreeRenderer from '../components/TreeRenderer.jsx'; // Import the new component
import '../App.css';

const ProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    document.title = `Project ${projectId}`;
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useContext(Context);
    const [tree, setTree] = useState([]);
    const [expandedDirs, setExpandedDirs] = useState({});
    const [tags, setTags] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState([]);



    const handleFileSelect2 = async (fileName) => {
        console.log('File selected:', fileName);
        setSelectedFile(null); // Clear any previously selected file
    
        // Find the file URL in the files array
        const selectedFile = files.find(file => file.public_id === fileName);
    
        if (selectedFile) {
            try {
                const response = await axios.get(selectedFile.url, {
                    responseType: 'blob', // Ensure the response is treated as a binary file
                });
                const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
                setSelectedFile(new File([fileBlob], fileName));
            } catch (error) {
                console.error('Error fetching file:', error);
                toast.error('Error fetching file');
            }
        } else {
            toast.error('File not found');
        }
    };


    const handleFileSelect = (file) => {
      console.log('File selected:', file);
      setSelectedFile(file);
    };

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
                if (response.data.project.treeStructure) {
                    setProject(response.data.project);
                    setTree(JSON.parse(response.data.project.treeStructure));
                    setFiles(JSON.parse(response.data.project.files));
                    setTags(response.data.project.languages[0].split(",").map(item => item.trim()));
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

    const toggleDirectory = (path) => {
        setExpandedDirs((prevState) => ({
            ...prevState,
            [path]: !prevState[path]
        }));
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 overflow-hidden">{project.projectName}</h1>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                <tbody className="divide-y divide-gray-200">
                                    <tr className='w-screen'>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Supervisor</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{project.supervisor}</td>
                                    </tr>
                                    <tr className='max-w-screen'>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Description</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{project.description}</td>
                                    </tr>
                                    <tr className='max-w-screen'>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Tags</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex gap-2">
                                                {tags.map((lang, index) => (
                                                    <div key={index} className="badge badge-neutral overflow-hidden">{lang}</div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='max-w-screen'>
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
                          <div className="flex flex-col lg:flex-row h-screen">
                              <div className="flex h-full w-screen lg:w-2/5">
                            <TreeRenderer 
                              node={tree} 
                              expandedDirs={expandedDirs} 
                              toggleDirectory={toggleDirectory}
                              handleFileSelect={handleFileSelect2}
                            />
                            </div>
                            <div className="flex h-full w-full p-5">
                                {selectedFile && (
                                  <CodeEditor fileBlob={selectedFile} readmode={false}/>
                                )}
                                
                              </div>
                              </div>
                        ) : (
                            <div className="flex h-screen">
                              <div className="flex h-full w-screen lg:w-2/5">
                                <ZipUpload onFileSelect={handleFileSelect} />
                              </div>

                              <div className="lg:flex hidden h-full w-full p-5">
                                {selectedFile && (
                                  <CodeEditor fileBlob={selectedFile} readmode={true}/>
                                )}
                                
                              </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectPage;
