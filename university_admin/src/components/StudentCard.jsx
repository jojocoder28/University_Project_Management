// ./src/StudentCard.js
import React from 'react';

const StudentCard = ({ student }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-slate-800 transform hover:scale-105 transition-transform duration-300">
      <img className="w-full h-48 object-cover" src={student.avatar && student.avatar.url || 'blankAvatar.jpg'} alt={`${student.username}'s profile`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{student.firstName+" "+student.lastName}</div>
        <p className="text-gray-300 text-base">Email: {student.email}</p>
        <p className="text-gray-300 text-base">Username: {student.username}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <button className="bg-slate-500 hover:bg-green-700 hover:border-none text-white font-bold py-2 px-4 rounded-md mb-4 w-full">
          Edit
        </button>
        <div className='px-1'>&nbsp;</div>
        <button className="bg-red-500 hover:bg-red-800 hover:border-none text-white font-bold py-2 px-4 rounded-md mb-4 w-full">
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
