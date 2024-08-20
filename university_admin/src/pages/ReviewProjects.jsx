import React, { useState, useEffect, useContext } from "react";
import { Context } from "../main";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import NavBar from "../components/NavBar.jsx";
import '../App.css';
import Modal from "../components/Modal.jsx";
import { backend_api, fileupload_api } from "../config";

const ReviewProjects = () => {
  document.title = `Review Projects`;
  const navigateTo = useNavigate();
  const { isAuthenticated } = useContext(Context);
    const [modify, setmodify] = useState(false);
  const [projects, setProjects] = useState([]);
  const [numProjects, setNumProjects] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);


    const giveApproval = async () => {
        try{
            const response = await axios.post(
                backend_api+'api/v1/project/approve',
                {projectId: selectedProjectId},
                { withCredentials: true }
            ).then((res)=>{
                toast.success(res.data.message);
                setmodify(true);
            })
        }catch(error){
            console.log(error);
        toast.error(error.response.data.message);
        }
    }

  const openModal = (projectId) => {
    setSelectedProjectId(projectId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProjectId(null);
  };

  const handleYes = () => {
    giveApproval();
    closeModal();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          backend_api + "api/v1/project/supervisor/getall/notapproved",
          { withCredentials: true }
        );
        if (response.data.project.length !== 0) {
          setProjects(response.data.project);
          setNumProjects(response.data.project.length);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [modify]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="items-center justify-start pb-4">
            <NavBar activeTab="ReviewProjects" />
          </div>
          <h1 className="uppercase font-bold flex container justify-center items-center">Pending Approvals</h1>
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
                    <tr
                      key={index}
                      className="cursor-pointer transition-color duration-300 hover:bg-gray-200 dark:hover:bg-slate-900"
                      onClick={() => openModal(project.projectId)}
                    >
                      <td className="px-6 py-4">{project.projectName}</td>
                      <td className="px-6 py-4">{project.creatorEmail}</td>
                      <td className="px-6 py-4 overflow-auto gap-2">
                        {project.description}
                      </td>
                      <td className="px-6 py-4 overflow-auto gap-2">
                        {project.languages ? (
                          project.languages.map((lang, index) => (
                            <ul key={index} className="list-disc list-inside">
                              {lang.split(',').map((tag, i) => (
                                <li key={i} className="overflow-hidden">{tag}</li>
                              ))}
                            </ul>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {project.isApproved ? (
                          <div className="badge badge-neutral dark:bg-green-800 bg-green-500 overflow-hidden">Approved</div>
                        ) : (
                          <div className="badge badge-neutral bg-yellow-400 dark:bg-yellow-700 overflow-hidden">Pending</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Confirmation Modal"
            className="modal"
            overlayClassName="modal-overlay"
          >
            <h2 className="text-lg font-bold mb-4">Confirmation</h2>
            <p>Do you want to approve this project?</p>
            <div className="flex justify-end mt-4">
              <button className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={closeModal}>No</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleYes}>Yes</button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default ReviewProjects;
