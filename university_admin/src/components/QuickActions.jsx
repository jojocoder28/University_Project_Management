import React, { useContext, useState, useEffect } from 'react';
import { FaBell } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { backend_api } from '../config';
import axios from 'axios';
import { Context } from '../main';
import Modal from './Modal';
import { toast } from 'react-toastify';

// Utility function to format date into hours ago
const timeAgo = (dateString) => {
    const now = new Date();
    const notificationDate = new Date(dateString);
    const hoursDiff = Math.floor((now - notificationDate) / (1000 * 60 * 60));
    return hoursDiff ? `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''} ago` : ' Just now';
};

function QuickActions() {
    const [projectId, setProjectId] = useState('');
    const [projectData, setProjectData] = useState(null);
    const [error, setError] = useState(null);
    const { admin } = useContext(Context);
    const [email, setEmail] = useState(admin.email);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [modify, setModify] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationModalOpen, setNotificationModalOpen] = useState(false);

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

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${backend_api}api/v1/project/colab/notification?email=${email}`, {
                withCredentials: true
            });
            setNotifications(response.data.notifications);
            setNotificationCount(response.data.notifications.length);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch notifications');
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [admin]);

    const handleNotificationClick = () => {
        fetchNotifications();
        setNotificationModalOpen(true);
    };

    const handleAccept = async (notificationemail, notificationid) => {
        try {
            const response = await axios.post(
                `${backend_api}api/v1/project/colab/accept`,
                { email: notificationemail, projectId: notificationid },
                { withCredentials: true }
            );
            toast.success(response.data.message);
            fetchNotifications();
        } catch (error) {
            console.error(error);
            toast.error('Failed to accept collaboration');
        }
    };

    const handleReject = async (notificationemail, notificationid) => {
        try {
            const response = await axios.post(
                `${backend_api}api/v1/project/colab/reject`,
                { email: notificationemail, projectId: notificationid },
                { withCredentials: true }
            );
            toast.success(response.data.message);
            fetchNotifications();
        } catch (error) {
            console.error(error);
            toast.error('Failed to reject collaboration');
        }
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
                <button className="btn mx-2 relative" onClick={handleNotificationClick}>
                    <FaBell />
                    {notificationCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {notificationCount}
                        </span>
                    )}
                    Notifications
                </button>

                {/* Notifications Modal */}
                <Modal
                    isOpen={notificationModalOpen}
                    onClose={() => setNotificationModalOpen(false)}
                    contentLabel="Notifications Modal"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h3 className="font-bold text-lg">Notifications</h3>
                    {notifications.length > 0 ? (
                        <ul className="mt-4 space-y-2">
                            {notifications.map((notification, index) => (
                                <div key={index} className="flex flex-row justify-between rounded-lg bg-slate-800">
                                    <div className="flex flex-col">
                                        <h5 className='px-2 font-bold'>Colab Notification</h5>
                                        <p className='px-2 italic text-orange-500 animate-pulse'>{timeAgo(notification.date)}</p>
                                        <li className="p-2">
                                            <p>Email: {notification.email}</p>
                                            <p>Project: {notification.projectId}</p>
                                        </li>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <button className='btn btn-ghost bg-green-600' onClick={() => handleAccept(notification.email, notification.projectId)}>
                                            Accept
                                        </button>
                                        <button className='btn btn-ghost bg-red-600' onClick={() => handleReject(notification.email, notification.projectId)}>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4">No new notifications</p>
                    )}
                </Modal>

                <button className="btn mx-2" onClick={() => document.getElementById('ProjectModal').showModal()}>
                    <LuPackage />
                    Project Action
                </button>

                <dialog id="ProjectModal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
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
                                {projectData.isApproved ? (<></>) : (
                                    <form method='dialog'>
                                        <button className='btn btn-ghost' onClick={() => openModal(projectData.projectId)}>Approve</button>
                                    </form>
                                )}
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
