import React from 'react';

const NotificationList = ({ notifications, onAccept, onReject }) => {
    function timeAgo(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const diffInHours = Math.floor(diff / (1000 * 60 * 60));
        const diffInMinutes = Math.floor(diff / (1000 * 60));

        if (diffInHours < 1) {
            return diffInMinutes < 1 ? 'just now' : `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        } else {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        }
    }

    return (
        <div className="notification-list">
            {notifications.map((notification, index) => (
                <div key={index} className="notification-item border p-4 mb-2 rounded shadow">
                    <p><strong>Email:</strong> {notification.email}</p>
                    <p><strong>Project ID:</strong> {notification.projectId}</p>
                    <p className="text-yellow-500 animate-pulse">{timeAgo(notification.date)}</p>
                    <div className="flex justify-end space-x-2 mt-2">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => onAccept(notification)}
                        >
                            Accept
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => onReject(notification)}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
