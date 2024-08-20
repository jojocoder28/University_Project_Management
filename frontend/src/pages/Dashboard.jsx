import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserData from '../components/UserData';
import ProjectList from '../components/ProjectList';
import NotificationList from '../components/NotificationList';
import Loading from "../components/Loading.jsx";
import { Context } from "../main";
import Modal from "../components/Modal"; // Import the custom Modal component
import { IoNotificationsOutline } from "react-icons/io5"; // Notification icon
import {backend_api, fileupload_api} from "../config.js";

function Dashboard() {
    document.title = "Profile";
    const { isAuthenticated } = useContext(Context);
    const { user } = useContext(Context);
    const [projects, setProjects] = useState([]);
    const [numProjects, setNumProjects] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [acceptance, setAcceptance] = useState(0);
    const [pending, setPending] = useState(0);
    const [date, setDate] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${backend_api}api/v1/project/getall`,
                    {
                        withCredentials: true,
                    }
                );
                if (response.data.project.length !== 0) {
                    setProjects(response.data.project);
                    setNumProjects(response.data.project.length);
                    const acceptanceRatio = await calculateTrueFalseRatio(response.data.project);
                    setAcceptance(acceptanceRatio.ratio);
                    setPending(acceptanceRatio.pending);
                    setDate(response.data.project[response.data.project.length - 1].creationDate);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchNotifications = async () => {
            try {
                const response = await axios.get(
                    `${backend_api}api/v1/project/colab/notification`, // Adjust the API endpoint as needed
                    {
                        withCredentials: true,
                    }
                );
                setNotifications(response.data.notifications);
            } catch (error) {
                console.log(error);
                // toast.error("Error fetching notifications");
            }
        };

        fetchProject();
        fetchNotifications();
    }, [isAuthenticated]);

    const calculateTrueFalseRatio = async (item) => {
        const length = item.length;
        let count = 0;
        let pending = length;
        if (length !== 0) {
            for (let i = 0; i < length; i++) {
                if (item[i].isApproved) {
                    count += 1;
                    pending -= 1;
                }
            }
        }
        const ratio = length === 0 ? 0 : (count / length) * 100;

        return {
            ratio: ratio.toFixed(2),
            pending: pending,
        };
    };

    const handleAccept = async (notification) => {
        try {
            await axios.post(
                `${backend_api}api/v1/project/colab/accept`,
                { projectId: notification.projectId, email: notification.email },
                {
                    withCredentials: true,
                }
            );
            toast.success("Collaboration request accepted");
            setNotifications((prev) => prev.filter((n) => n !== notification));
        } catch (error) {
            console.log(error);
            toast.error("Error accepting collaboration request");
        }
    };

    const handleReject = async (notification) => {
        try {
            await axios.post(
                `${backend_api}api/v1/project/colab/reject`,
                { projectId: notification.projectId, email: notification.email },
                {
                    withCredentials: true,
                }
            );
            toast.success("Collaboration request rejected");
            setNotifications((prev) => prev.filter((n) => n !== notification));
        } catch (error) {
            console.log(error);
            toast.error("Error rejecting collaboration request");
        }
    };

    if (!isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="container mx-auto h-auto w-full">
                    <div className="flex items-start justify-center">
                        <UserData
                            fname={user.firstName}
                            lname={user.lastName}
                            role="User"
                            course={user.course}
                            university={user.university}
                            numProjects={numProjects}
                            acceptance={acceptance}
                            date={date}
                            pending={pending}
                            view={false}
                        />
                    </div>
                    <div className="divider"></div>
                    <div className="flex gap-5 w-full justify-center items-center">
                        <div className="flex items-center justify-between gap-5">
                            <h2 className="text-2xl font-semibold text-center my-4">Projects</h2>
                            {/* <div className="flex px-5 justify-center overflow-hidden">
                                <a href='/project/add' className="btn btn-primary hover:bg-blue-200 dark:hover:bg-slate-900 shadow-md">Add Project</a>
                            </div> */}
                        </div>
                        {/* Notification Icon */}
                        <div className="relative pt-2">
                          <button
                              className="text-gray-800 dark:text-gray-200 w-12"
                              onClick={() => setIsModalOpen(true)}
                          >
                              <IoNotificationsOutline className="text-3xl" /> 
                              {notifications.length > 0 && (
                                  <span className="absolute top-1 right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold bg-red-600 text-white rounded-full">
                                      {notifications.length}
                                  </span>
                              )}
                          </button>
                      </div>
                    </div>
                    {numProjects !== 0 ? (
                        <div className="flex w-full justify-center border-gray-700 rounded-md shadow-md">
                            <div className="max-w-3/5">
                                <ProjectList
                                    projects={projects}
                                    view={false}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full justify-center border-gray-700 rounded-md shadow-md">
                            <div className="max-w-3/5">
                                No projects
                            </div>
                        </div>
                    )}

                    {/* Notification Modal */}
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                        {notifications.length > 0 ? (
                            <NotificationList
                            notifications={notifications}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                        ) : (
                            <div>No notifications</div>
                        )}
                    </Modal>
                </div>
            )}
        </>
    );
}

export default Dashboard;
