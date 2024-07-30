import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import backend_api from '../config.js';
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import CodeEditor from '../components/CodeEditor.jsx';
import TreeRenderer from '../components/TreeRenderer.jsx';
import '../App.css';
import NavBar from '../components/NavBar.jsx';

const ProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(Context);
    document.title = `Project ${projectId}`;
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
        window.scrollTo(0, 0);
      }, []);
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
                setProject(response.data.project);
                if (response.data.project.treeStructure) {
                    setTree(JSON.parse(response.data.project.treeStructure));
                  }
                    setFiles(JSON.parse(response.data.project.files));
                    setTags(response.data.project.languages[0].split(",").map(item => item.trim()));
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
                <><div className="items-center justify-start pb-4">
                        <NavBar activeTab="Projects" />
                    </div>
                    <div className="flex flex-col items-center py-10 w-screen">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{project.projectName}</h1>
                    <div className="max-w-screen w-4/5">
                        <div className="bg-teal-50 dark:bg-gray-800 shadow overflow-hidden p-3 sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-gray-100">Project Details</h3>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700">
                                <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Supervisor</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{project.supervisor}</dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{project.description}</dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Tags</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                            <div className="flex flex-wrap gap-2">
                                                {tags.map((lang, index) => (
                                                    <span key={index} className="overflow-hidden badge badge-neutral dark:bg-gray-700 bg-gray-200">{lang}</span>
                                                ))}
                                            </div>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Status</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                            {project.isApproved ? (
                                                <span className="overflow-hidden badge badge-neutral dark:bg-green-800 bg-green-500">Approved</span>
                                            ) : (
                                                <span className="overflow-hidden badge badge-neutral dark:bg-yellow-700 bg-yellow-400">Pending</span>
                                            )}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                            <div className="max-h-screen w-screen mt-8 px-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Project Files</h2>
                                {tree && tree.children && tree.children.length > 0 ? (
                                    <div className="flex flex-col lg:flex-row max-h-screen">
                                        <div className="flex h-full w-screen lg:w-2/5">
                                            <TreeRenderer
                                                node={tree}
                                                expandedDirs={expandedDirs}
                                                toggleDirectory={toggleDirectory}
                                                handleFileSelect={handleFileSelect2} />
                                        </div>
                                        <div className="flex max-h-screen w-full pb-24">
                                            {selectedFile && (
                                                <CodeEditor fileBlob={selectedFile} readmode={false} />
                                            )}

                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center max-h-screen">
                                        <h1 className='text-4xl font-extrabold animate-pulse'>No Project Files</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                        </>
            )}
        </>
    );
};

export default ProjectPage;
