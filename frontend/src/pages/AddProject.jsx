import React, { useState, useContext, useEffect } from 'react';
import JSZip from 'jszip';
import axios from 'axios';
import { toast } from "react-toastify";
import FolderTree from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import {backend_api, fileupload_api} from "../config.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from '../main.jsx';

const AddProject = () => {
  document.title="Add Project";
  const [treeData, setTreeData] = useState(null);
  const [filesMap, setFilesMap] = useState(new Map())
  
  const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();
  
  const [projectId, setprojectId] = useState("");
  const [projectName, setprojectName] = useState("");
  const [description, setdescription] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [fileurl, setfileurl] = useState("");
  const [email, setEmail] = useState(user.email);
  const [university, setUniversity] = useState(user.university);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleProject = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          backend_api+"api/v1/project/create/new",
          { projectId, projectName, description, supervisor, email, university, date },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          navigateTo("/dashboard");
          setprojectId("");
          setprojectName("");
          setdescription("");
          setSupervisor("");
          setfileurl("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleZipUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);

      const files = [];
      contents.forEach((relativePath, zipEntry) => {
        files.push({
          name: zipEntry.name,
          isDirectory: zipEntry.dir,
        });

        if (!zipEntry.dir) {
          zipEntry.async('blob').then((blob) => {
            setFilesMap((prev) => new Map(prev).set(zipEntry.name, blob));
          });
        }
      });

      const tree = createTree(files);
      setTreeData(tree);
    }
  };

  const createTree = (files) => {
    const tree = { name: 'root', children: [] };
    const map = {};

    files.forEach((file) => {
      const parts = file.name.split('/');
      let currentNode = tree;

      parts.forEach((part, index) => {
        if (!currentNode.children) currentNode.children = [];

        let node = currentNode.children.find((child) => child.name === part);
        if (!node) {
          node = { name: part, children: [], isDirectory: file.isDirectory };
          currentNode.children.push(node);
        }
        currentNode = node;
      });
    });

    return tree;
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    filesMap.forEach((blob, name) => {
      formData.append('files', blob, name);
    });

    formData.append('tree', JSON.stringify(treeData));
    formData.append('projectId',projectId);
    formData.append('projectName',projectName);
    try {
      await axios.post(fileupload_api+'api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res)=>{
        toast.success(res.data.message);
        alert("Success")
        setfileurl(res.data.files);
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error(error.response.data.message);
      alert("error")
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex justify-center py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold py-10 overflow-hidden cursor-default select-none">
                  <span>Add</span><span className="animate-pulse text-teal-500"> Project</span>
                </h2>
              </div>
              <form className="w-full max-w-lg" onSubmit={handleProject}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-projectId">
                      Project ID <span className="text-red-700">*</span>
                    </label>
                    <input value={projectId} onChange={(e) => setprojectId(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-projectId" type="text" placeholder="Give your project an unique id"/>                   
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-projectName">
                      Project Name <span className="text-red-700">*</span>
                    </label>
                    <input value={projectName} onChange={(e) => setprojectName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-projectName" type="text" placeholder="Give your project a beutiful name"/>
                  </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
                      Project Description <span className="text-red-700">*</span>
                    </label>
                    <textarea value={description} onChange={(e) => setdescription(e.target.value)} className="appearance-none h-24 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" type="text" placeholder="Describe your project in few words"/>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-supervisor">
                      Supervisor Email <span className="text-red-700">*</span>
                    </label>
                    <input value={supervisor} onChange={(e) => setSupervisor(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-supervisor" type="email" placeholder="Supervisor email"/>
                  </div>
                </div>
                {/* <div className="flex justify-center pt-2 items-center overflow-hidden">
                  <a className="btn mx-2" onClick={()=>{document.getElementById('StudentModal').showModal() }}>Upload Files</a>
                </div> */}
                {/* <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="flex flex-col w-full px-3 overflow-hidden">
                  <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
                      Project Files
                    </label>
                    <a className="btn btn-ghost bg-gray-400 bg-opacity-25 hover:border-black dark:hover:border-white" onClick={()=>{document.getElementById('StudentModal').showModal() }}>Upload Files</a>
                  </div>
                </div>
                <dialog id="StudentModal" className="modal dark:bg-slate-950 bg-white">
                <div className="modal-box dark:bg-slate-800">
                    
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                   
                    <h3 className="font-bold text-lg">Upload Files</h3>
                <input type="file" accept=".zip" onChange={handleZipUpload} />
                {treeData && (
                  <><FolderTree
                      data={treeData}
                      initOpenStatus='0'
                      />
                
                    
                <div className="flex justify-center pt-2 items-center">
                  
                    <button className="btn" onClick={handleSubmit}>Submit</button>
                </div>
                </>
              )}
              </div>
              </dialog> */}
              <div className="flex justify-center pt-2 items-center">
                  <button className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded items-center justify-center" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
        </div>
    
    
  );
};

export default AddProject;
