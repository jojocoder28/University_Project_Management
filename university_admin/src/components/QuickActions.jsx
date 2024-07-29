import React, { useContext, useState, useEffect } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import backend_api from '../config';
import axios from 'axios';
import { Context } from '../main';
import Modal from './Modal';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed and configured

function QuickActions() {
    const [projectId, setProjectId] = useState('');
    const [projectData, setProjectData] = useState(null);
    const [error, setError] = useState(null);
    const { admin, setAdmin } = useContext(Context);
    const [email, setEmail] = useState(admin.email);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [modify, setModify] = useState(false); // Added to handle modification state

    const giveApproval = async () => {
        try {
            const response = await axios.post(
                backend_api + 'api/v1/project/approve',
                { projectId: selectedProjectId },
                { withCredentials: true }
            );
            toast.success(response.data.message);
            setModify(true);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

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
        setProjectData(null);
    }, [modify]);

    const handleSearch = async () => {
        try {
            setError(null);
            setProjectData(null);
            const response = await axios.get(`${backend_api}api/v1/project/supervisor/byid`, {
                params: {
                    projectId: projectId,
                    email: email
                },
                withCredentials: true
            });

            if (!response.data.project) {
                throw new Error('Project not found');
            }

            const data = response.data.project;
            setProjectData(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="pt-5">
                <div className="flex text-xl text-slate-200 items-center py-5 justify-center">Quick Actions</div>
                <button className="btn mx-2" onClick={() => document.getElementById('StudentModal').showModal()}>
                    <FaPlusSquare />
                    Add Student
                </button>

                <dialog id="StudentModal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Add a Student</h3>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>

                <button className="btn mx-2" onClick={() => document.getElementById('ProjectModal').showModal()}>
                    <LuPackage />
                    Project Action
                </button>

                <dialog id="ProjectModal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Approve/Reject a Project</h3>
                        <input
                            type="text"
                            placeholder="Project ID"
                            className="input input-bordered w-full max-w-xs mt-4"
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                        />
                        <button type="button" className="btn join-item ml-2" onClick={handleSearch}>Search</button>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                        {projectData && (
                            <div className="mt-4">
                                <h4 className="font-bold">Project Details:</h4>
                                <p>ID: {projectData.projectId}</p>
                                <p>Name: {projectData.projectName}</p>
                                <p>Description: {projectData.description}</p>
                                <p>Status: {projectData.isApproved ? (<span className='text-green-500'>Approved</span>) : (<span className='text-yellow-500'>Pending</span>)}</p>
                                {projectData.isApproved ? (<></>):(
                                    <form method='dialog'>
                                <button className='btn btn-ghost' onClick={() => openModal(projectData.projectId)}>Approve</button>
                                </form>)}
                                
                            </div>

                        )}
                    </div>
                </dialog>
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
    );
}

export default QuickActions;
