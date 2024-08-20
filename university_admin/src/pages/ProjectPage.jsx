import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { backend_api, fileupload_api } from '../config.js';
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import NavBar from '../components/NavBar.jsx';
import Modal from '../components/Modal.jsx';
import { FaFileAlt, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileAudio, FaFileVideo, FaFileArchive, FaCode } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import { DiPython, DiHtml5, DiCss3, DiJavascript1, DiJava } from 'react-icons/di';
import { SiJupyter } from 'react-icons/si';
import Geminicomponent from '../components/Geminicomponent.jsx';

const ProjectPage = () => {
  const { projectId } = useParams();
  const { isAuthenticated } = useContext(Context);
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [jobRequests, setJobRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJobRequest, setNewJobRequest] = useState({
    title: '',
    description: '',
    deadline: '',
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [submissionContent, setSubmissionContent] = useState("");
  const [submissions, setSubmissions] = useState({});
  const today = new Date().toISOString().split('T')[0];


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
        if (response.data.project.languages[0]) {
          setTags(response.data.project.languages[0].split(",").map(item => item.trim()));
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch project details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchJobRequests = async () => {
      try {
        const response = await axios.get(`${fileupload_api}job-requests`, {
          params: { id: projectId }
        });
        setJobRequests(response.data.jobRequests);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch job requests');
      }
    };

    fetchJobRequests();
  }, [projectId]);

  const handleCreateJobClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJobRequest({ ...newJobRequest, [name]: value });
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${fileupload_api}job-requests`, {
        id: projectId,
        ...newJobRequest,
      });
      setJobRequests([...jobRequests, response.data.jobRequest]);
      setIsModalOpen(false);
      toast.success('Job request created successfully');
    } catch (error) {
      console.error('Error creating job request:', error);
      toast.error('Failed to create job request');
    }
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
    
    if (totalDuration <= 0) return 100; // Deadline has passed
    if (duration <= 0) return 0; // Job request just created
  
    return Math.max(0, Math.min(100, (1 - (totalDuration / duration)) * 100));
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



  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="items-center justify-start pb-4">
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
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Creation Date</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{project.creationDate}</dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Deadline</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{project.deadline}</dd>
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
                        {!project.isClosed ? (
                          <span className="overflow-hidden badge badge-neutral dark:bg-green-800 bg-green-500">Open</span>
                        ) : (
                          <span className="overflow-hidden badge badge-neutral dark:bg-red-700 bg-red-400">Closed</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="container mx-auto flex flex-col justify-center items-center py-5">
              <button
                onClick={handleCreateJobClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              >
                Create a new Job
              </button>
              {/* {jobRequests.length > 0 ? (
                jobRequests.map((jobRequest) => (
                    <div key={jobRequest._id} className="bg-white dark:bg-gray-800 shadow overflow-hidden p-3 sm:rounded-lg w-96 mb-4">
                    <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-gray-100">{jobRequest.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{jobRequest.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Deadline: {new Date(jobRequest.deadline).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Submissions: {jobRequest.submissions.length}</p>

                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time Remaining</label>
                        <div className="relative pt-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-300">Start</span>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-300">Deadline</span>
                        </div>
                        <div className="flex py-1 items-center">
                            <div className="relative flex-1 bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                            <div
                                className="absolute h-full bg-blue-500"
                                style={{ width: `${calculateProgress(jobRequest.deadline)}%` }}
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                ))
                ) : (
                <h1>No Progress</h1>
                )} */}

                    <div className="max-w-screen w-4/5 mt-6">
                        {/* <ProjectReport /> */}
                        <Geminicomponent
                        project={project}
                        jobRequests={jobRequests}
                        submissions={submissions}
                        />
                    </div>
                <div className="max-w-screen w-4/5 mt-6">
                        <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-gray-100 py-5">Job Requests</h3>
                        {jobRequests.map((jobRequest) => (
                            <div key={jobRequest._id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-4">
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
                                
                                
                            </div>
                        ))}
                    </div>

            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <h2 className="text-2xl font-bold mb-4">Create a New Job Request</h2>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newJobRequest.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={newJobRequest.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={newJobRequest.deadline}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  min={today}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Job
              </button>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProjectPage;
