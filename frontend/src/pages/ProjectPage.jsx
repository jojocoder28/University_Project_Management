import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { backend_api, fileupload_api } from '../config.js';
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import ImageUpload from "../components/imageUpload.jsx";
import Modal from '../components/Modal';
import '../App.css';
import { FaFileAlt, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileAudio, FaFileVideo, FaFileArchive, FaCode } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import { DiPython, DiHtml5, DiCss3, DiJavascript1, DiJava } from 'react-icons/di';
import { SiJupyter } from 'react-icons/si';
import ProjectReport from '../components/ProjectReport.jsx';
import GeminiComponent from '../components/Geminicomponent.jsx';

const ProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(Context);
    document.title = `${user.username} | Project - ${projectId}`;
    const [jobRequests, setJobRequests] = useState([]);
    const [email, setEmail] = useState(user.email);
    const [desc, setDesc] = useState(false);
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [iscolab, setIscolab] = useState('');
    const [tags, setTags] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [submissionContent, setSubmissionContent] = useState("");
    const [submissions, setSubmissions] = useState({}); // Store submissions by job request ID
    const [selectedJobRequestId, setSelectedJobRequestId] = useState(null);

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
                { projectId: selectedProjectId, email: user.email },
                { withCredentials: true }
            );
            toast.success(response.data.message);
            setModify(true);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
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
                    { withCredentials: true }
                );
                setProject(response.data.project);
                setIscolab(response.data.project.colabEmail.includes(user.email));
                response.data.project.creatorEmail !== user.email ? setDesc(true) : setDesc(false);
                if(response.data.project.languages[0]){
                setTags(response.data.project.languages[0].split(",").map(item => item.trim()));}
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

    const fetchJobRequests = async () => {
        try {
            const response = await axios.get(`${fileupload_api}job-requests`, {
                params: { id: projectId }
            });
            setJobRequests(response.data.jobRequests);
            response.data.jobRequests.forEach(jobRequest => {
                fetchSubmissions(jobRequest._id);
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch job requests');
        }
    };

    const fetchSubmissions = async (jobRequestId) => {
        try {
            const response = await axios.get(`${fileupload_api}job-requests/${jobRequestId}/submissions`);
            setSubmissions(prevSubmissions => ({
                ...prevSubmissions,
                [jobRequestId]: response.data.submissions
            }));
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch submissions');
        }
    };

    useEffect(() => {
        fetchJobRequests();
    }, []);

    const calculateProgress = (deadline) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const totalDuration = deadlineDate - now;
        const duration = deadlineDate - new Date(project.creationDate);

        if (totalDuration <= 0) return 100;
        if (duration <= 0) return 0;

        return Math.max(0, Math.min(100, (1 - (totalDuration / duration)) * 100));
    };

    const handleSubmitResponse = async (jobRequestId) => {
        const formData = new FormData();
        selectedImages.forEach(file => formData.append('images', file));
        formData.append('email', email);
        formData.append('caption', submissionContent);

        try {
            const response = await axios.post(
                `${fileupload_api}job-requests/${jobRequestId}/submissions`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            toast.success(response.data.message);
            setSubmissionContent("");
            setSelectedImages([]);
            fetchSubmissions(jobRequestId);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    const isImageFile = (url) => {
        return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    };

    const truncateFileName = (filename, maxLength = 15) => {
        if (filename.length <= maxLength) return filename;
        return `${filename.substring(0, maxLength)}...`;
    };
    
    const getFileIcon = (extension) => {
        switch (extension) {
            case 'pdf':
                return <FaFilePdf className="text-red-600" />;
            case 'doc':
            case 'docx':
                return <FaFileWord className="text-blue-600" />;
            case 'xls':
            case 'xlsx':
                return <FaFileExcel className="text-green-600" />;
            case 'ppt':
            case 'pptx':
                return <FaFilePowerpoint className="text-orange-600" />;
            case 'mp3':
            case 'wav':
                return <FaFileAudio className="text-purple-600" />;
            case 'mp4':
            case 'avi':
            case 'mov':
                return <FaFileVideo className="text-teal-600" />;
            case 'zip':
            case 'rar':
                return <FaFileArchive className="text-yellow-600" />;
            case 'html':
                return <DiHtml5 className="text-orange-600" />;
            case 'css':
                return <DiCss3 className="text-blue-600" />;
            case 'js':
                return <DiJavascript1 className="text-yellow-600" />;
            case 'py':
                return <DiPython className="text-blue-500" />;
            case 'java':
                return <DiJava className="text-red-600" />;
            case 'c':
            case 'cpp':
            case 'c++':
                return <FaCode className="text-blue-800" />; // General code file icon
            case 'ipynb':
                return <SiJupyter className="text-yellow-600" />;
            default:
                return <IoDocumentText className="text-gray-600" />;
        }
    };
    
    const renderImagePreview = (files) => {
        if (!files || files.length === 0) return null;
    
        return files.map((file, index) => {
            const isImage = isImageFile(file.url);
            const fileName = file.url.split('/').pop(); // Extract file name from URL
            const fileExtension = fileName.split('.').pop().toLowerCase(); // Get file extension
    
            return (
                <a
                    key={index}
                    href={file.url}
                    download
                    className="inline-block mr-2"
                >
                    <div className="relative flex items-center justify-center h-36 w-36">
                        {isImage ? (
                            <img
                                src={file.url}
                                alt={`Submission ${index}`}
                                className="h-36 w-36 object-cover cursor-pointer"
                            />
                        ) : (
                            <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded h-full w-full">
                                {getFileIcon(fileExtension)}
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                            {truncateFileName(fileName)}
                        </div>
                    </div>
                </a>
            );
        });
    };
    
    const isDeadlineOver = (deadline) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        return now > deadlineDate;
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
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Deadline</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{formatDate(project.deadline)}</dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Progress</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${calculateProgress(project.deadline)}%` }}></div>
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-screen w-4/5 mt-6">
                        {/* <ProjectReport /> */}
                        <GeminiComponent
                        project={project}
                        jobRequests={jobRequests}
                        submissions={submissions}
                        />
                    </div>
                    <div className="max-w-screen w-4/5 mt-6">
                        <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-gray-100 py-5">Job Requests</h3>
                        {jobRequests.map((jobRequest) => (
                            <div key={jobRequest._id} className="bg-gray-100 dark:bg-gray-800 shadow rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-300">Start</span>
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-300">Deadline</span>
                                </div>
                                <div className="flex py-3 items-center">
                                    <div className="relative flex-1 bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                                    <div
                                        style={{ width: `${calculateProgress(jobRequest.deadline)}%` }}
                                        className={`absolute h-full ${calculateProgress(jobRequest.deadline) > 75 ? 'bg-red-600' : 'bg-green-600'}`}
                                    />
                                    </div>
                                </div>
                                <h4 className="text-md font-bold text-gray-900 dark:text-gray-100">{jobRequest.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-300">{jobRequest.description}</p>
                                <div className="mt-4">
                                    <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100">Submissions:</h5>
                                    {submissions[jobRequest._id]?.length > 0 ? (
                                        <div className="space-y-2">
                                            {submissions[jobRequest._id].map((submission, index) => (
                                                <div key={index} className="border rounded-md p-2 bg-gray-50 dark:bg-gray-900">
                                                    <div className="font-bold text-gray-900 dark:text-gray-100">{submission.email}</div>
                                                    <p className="mt-2 text-gray-600 dark:text-gray-300">{submission.caption}</p>
                                                    {submission.files && (
                                                        <div className="flex flex-wrap mt-2">
                                                            {renderImagePreview(submission.files)}
                                                        </div>
                                                    )}
                                                    
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-300">No submissions yet.</p>
                                    )}
                                </div>
                                {iscolab && (
                                        <div className="mt-4">
                                        {!isDeadlineOver(jobRequest.deadline) ? (
                                            <div>
                                                <ImageUpload
                                                    selectedImages={selectedImages}
                                                    setSelectedImages={setSelectedImages}
                                                    handleSubmit={() => handleSubmitResponse(jobRequest._id)}
                                                />
                                                <textarea
                                                    value={submissionContent}
                                                    onChange={(e) => setSubmissionContent(e.target.value)}
                                                    placeholder="Add a caption..."
                                                    rows="3"
                                                    className="w-full mt-2 p-2 rounded-md dark:bg-gray-700 bg-white"
                                                />
                                                <button
                                                    onClick={() => handleSubmitResponse(jobRequest._id)}
                                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                                                >
                                                    Submit Response
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-red-500">Submission deadline is over.</p>
                                        )}
                                
                                </div>
                                )}
                                
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                <h2 className="text-lg font-bold">Confirmation</h2>
                <p>Are you sure you want to approve collaboration for this project?</p>
                <div className="mt-4 flex justify-end">
                    <button onClick={handleYes} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Yes</button>
                    <button onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">No</button>
                </div>
            </Modal>
        </>
    );
};

export default ProjectPage;
