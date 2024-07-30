import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { backend_api, fileupload_api } from '../config.js';
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import ZipUpload from './FileUpload.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import TreeRenderer from '../components/TreeRenderer.jsx';
import Modal from '../components/Modal';
import '../App.css';

const ProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(Context);
    document.title = `${user.username} | Project - ${projectId}`;
    const [email, setEmail] = useState(user.email);
    const [desc, setDesc] = useState(false);
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tree, setTree] = useState([]);
    const [expandedDirs, setExpandedDirs] = useState({});
    const [tags, setTags] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [modify, setModify] = useState(false); // Added to handle modification state
    const [iscolab, setIscolab] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const openModal = (projectId) => {
        setSelectedProjectId(projectId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedProjectId(null);
    };

    const handleYes = () => {
        colabApproval();
        closeModal();
    };

    const colabApproval = async () => {
        try {
            const response = await axios.post(
                backend_api + 'api/v1/project/colab/approve',
                { projectId: selectedProjectId, 
                    email: user.email
                 },
                { withCredentials: true }
            );
            toast.success(response.data.message);
            setModify(true);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

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
                setIscolab(response.data.project.colabEmail.includes(user.email));
                response.data.project.creatorEmail != user.email ? setDesc(true) : setDesc(false);
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
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    const toggleDirectory = (path) => {
        setExpandedDirs((prevState) => ({
            ...prevState,
            [path]: !prevState[path]
        }));
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        });
    };

    const downloadZip = async () => {
        try {
            const response = await axios.get(`${fileupload_api}api/download/${projectId}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${projectId}.zip`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log("SDK CNQ");
            // toast.error('Error downloading zip');
        }
    };
    
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
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
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Creation Date & Time</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{formatDate(project.creationDate)}</dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Creator Email</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                            {desc ? (
                                                <a className='text-blue-500 hover:text-blue-800 dark:hover:text-blue-700' href={"/profile/"+project.creatorEmail}>{project.creatorEmail}</a>
                                                ):(
                                                    project.creatorEmail
                                            )}
                                            
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    {desc ? (
                        !iscolab ? (
                        <div className='py-3'>
                        <button className='btn' onClick={() => openModal(project.projectId)}>Colab Request</button>
                        </div>) : (
                            <div className='flex py-3 w-screen justify-center items-center'>
                                <p className='font-extralight italic text-green-500'>You are one of the collaborators of this project</p>
                            </div>
                        )
                    ):(
                        <></>
                    )}
                    <div className="projecttree max-h-screen w-screen mt-8 px-10 ">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Project Files</h2>
                        { !desc ? (
                        tree && tree.children && tree.children.length > 0 ? (
                            <><div className="flex flex-col lg:flex-row max-h-screen">
                                        <div className="flex h-full w-screen lg:w-2/5">
                                            <TreeRenderer
                                                node={tree}
                                                expandedDirs={expandedDirs}
                                                toggleDirectory={toggleDirectory}
                                                handleFileSelect={handleFileSelect2} />
                                        </div>

                                        <div className="flex max-h-screen w-full p-5">
                                            {selectedFile && (
                                                <CodeEditor fileBlob={selectedFile} readmode={false} />
                                            )}
                                        </div>
                                    </div><button className='btn hover:bg-blue-400 dark:hover:bg-blue-900' onClick={downloadZip}>Download All as Zip</button></>
                        ) : (
                            <div className="flex max-h-screen">
                                <div className="flex h-full w-screen lg:w-2/5">
                                    <ZipUpload onFileSelect={handleFileSelect} />
                                </div>
                                <div className="lg:flex hidden h-full w-full p-5">
                                    {selectedFile && (
                                        <CodeEditor fileBlob={selectedFile} readmode={true}/>
                                    )}
                                </div>
                            </div>
                        )) : (
                            tree && tree.children && tree.children.length > 0 ? (
                                <div className="flex flex-col lg:flex-row max-h-screen">
                                    <div className="flex max-h-full w-screen lg:w-2/5">
                                        <TreeRenderer 
                                            node={tree} 
                                            expandedDirs={expandedDirs} 
                                            toggleDirectory={toggleDirectory}
                                            handleFileSelect={handleFileSelect2}
                                        />
                                    </div>
                                    <div className="flex max-h-screen w-full p-5">
                                        {selectedFile && (
                                            <CodeEditor fileBlob={selectedFile} readmode={true}/>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className='flex items-center py-12 overflow-hidden justify-center'>
                                     <h1 className='font-extrabold text-4xl overflow-hidden'>No Project Files</h1>
                                </div>
                            )
                            
                        )
                    }
                    </div>
                </div>
            )}


            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirmation Modal"
                className="modal"
                overlayClassName="modal-overlay"
                onClose={() => setModalIsOpen(false)}
            >
                <h2 className="text-lg font-bold mb-4">Confirmation</h2>
                <p>Do you want to sent a colaboration request to the user?</p>
                <div className="flex justify-end mt-4">
                    <button className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={closeModal}>No</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleYes}>Yes</button>
                </div>
            </Modal>
        </>
    );
};

export default ProjectPage;
