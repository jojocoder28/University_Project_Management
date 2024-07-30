import React from 'react';

const NotificationList = ({ notifications }) => {
    return (
        <div className="notification-list">
            {notifications.map((notification, index) => (
                <div key={index} className="notification-item border p-4 mb-2 rounded shadow">
                    <p><strong>Email:</strong> {notification.email}</p>
                    <p><strong>Project ID:</strong> {notification.projectId}</p>
                    {/* <p><strong>Message:</strong> {notification.message}</p> */}
                    <p><strong>Date:</strong> {new Date(notification.date).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
