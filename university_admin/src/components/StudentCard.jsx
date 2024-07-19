import React , {useState, useEffect, useContext} from 'react';
import Modal from './Modal';
import UpdateStudentDetails from './UpdateStudentDetails';
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import backend_api from '../config';



const StudentCard = ({ student }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [email,setEmail] = useState(student.email);
    const navigateTo = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal2 = () => {
        setIsModalOpen2(true);
    };

    const closeModal2 = () => {
        setIsModalOpen2(false);
    };
    
    useEffect(() => {
        if (student.rollnumber && student.admissiondate) {
          setIsDataAvailable(true);
        } else {
          setIsDataAvailable(false);
        }
      }, [isModalOpen]);

    const updateOption = () => {
        setIsDataAvailable(false);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
          await axios
            .post(
              backend_api+"api/v1/university/user/delete",
              { email },
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((res) => {
              toast.success(res.data.message);
              navigateTo("/students")
              setIsModalOpen2(false)
              setEmail("");    
            });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
    
  return (
    <>
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-slate-800 transform hover:scale-105 transition-transform duration-300">
      <img className="w-full h-48 object-cover" src={student.avatar && student.avatar.url || 'blankAvatar.jpg'} alt={`${student.username}'s profile`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{student.firstName+" "+student.lastName}</div>
        <p className="text-gray-300 text-base">Email: {student.email}</p>
        <p className="text-gray-300 text-base">Username: {student.username}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <button className="bg-slate-500 hover:bg-green-700 border-none text-white font-bold py-2 px-4 rounded-md mb-4 w-full" onClick={openModal}>
          Edit
        </button>
        <div className='px-1'>&nbsp;</div>
        <button className="bg-red-500 hover:bg-red-800 border-none text-white font-bold py-2 px-4 rounded-md mb-4 w-full" onClick={openModal2}>
          Delete
        </button>
      </div>
    </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            {
                isDataAvailable ? (
                    <div className='flex flex-col justify-center items-center align-middle'>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{student.firstName+" "+student.lastName}</div>
                            <p className="text-gray-300 text-base">Email: {student.email}</p>
                            <p className="text-gray-300 text-base">Username: {student.username}</p>
                            <p className="text-gray-300 text-base">Roll Number: {student.rollnumber}</p>
                            <p className="text-gray-300 text-base">Admission Date: {student.admissiondate}</p>
                        </div>
                        <button className='btn btn-primary' onClick={updateOption}>Edit</button>
                    </div>
                ) : (
                    <UpdateStudentDetails email={student.email} name={student.firstName+" "+student.lastName} />
                )
            }
        </Modal>
        <Modal isOpen={isModalOpen2} onClose={closeModal2}>
            <div className="flex flex-col justify-center items-center">
                <p className='text-xl'>Are you sure you want to delete this student?</p>
                <div className="flex flex-row">
                    <div className="px-4 pt-5">
                <button className='bg-red-500 hover:bg-red-800 border-none text-white font-bold py-2 px-4 rounded-md mb-4 w-full' onClick={handleDelete}>Yes</button>
                </div>
                <div className="px-4 pt-5">
                <button className="bg-slate-500 hover:bg-green-700 border-none text-white font-bold py-2 px-4 rounded-md mb-4 w-full" onClick={closeModal2}>
                    No
                </button>
                </div>
                </div>
            </div>
        </Modal>
        </>
  );
};

export default StudentCard;
