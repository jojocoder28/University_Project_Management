import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { backend_api } from '../config.js';
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';
import ZipUpload from './FileUpload.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
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
    const [tags,setTags] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState([]);

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
                    // console.log(response.data.project.languages[0].split(",").map(item => item.trim()));
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

    // const gotoFileUpload = () => {
    //     navigate(`/project/${projectId}/fileupload`);
    // };

    const toggleDirectory = (path) => {
        setExpandedDirs((prevState) => ({
            ...prevState,
            [path]: !prevState[path]
        }));
    };

    const renderTree = (node, depth = 0) => {
      if (!node.children) return null;

      return (
          <ul style={{ marginLeft: depth * 20 }}>
              {node.children.map((child, index) => {
                  const childPath = `${node.name}/${child.name}`;
                  return (
                      <li key={index} style={{ marginBottom: '5px' }}>
                          {child.isDirectory ? (
                              <>
                                  <div onClick={() => toggleDirectory(childPath)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                      {expandedDirs[childPath] ? <FaFolderOpen /> : <FaFolder />}
                                      <strong style={{ marginLeft: '5px' }}>{child.name}</strong>
                                  </div>
                                  {expandedDirs[childPath] && renderTree(child, depth + 1)}
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
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 overflow-hidden">{project.projectName}</h1>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
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
                            renderTree(tree)
                        ) : (
                            // <button
                            //     onClick={gotoFileUpload}
                            //     className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            // >
                            //     Upload Files
                            // </button>
                            <div className="flex h-screen">
                              <div className="flex h-full w-screen lg:w-2/5">
                                <ZipUpload onFileSelect={handleFileSelect} />
                              </div>

                              <div className="lg:flex hidden h-full w-full p-5">
                                {selectedFile && (
                                  <CodeEditor fileBlob={selectedFile}/>
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
