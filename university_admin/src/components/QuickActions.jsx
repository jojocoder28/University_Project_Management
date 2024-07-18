import React from 'react'
import { FaPlusSquare } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";


function QuickActions() {
    
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-xl text-slate-200">Quick Actions</div>
                <button className="btn" onClick={()=>{document.getElementById('StudentModal').showModal() }}>
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

                <button className="btn" onClick={()=>{document.getElementById('ProjectModal').showModal() }}>
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
                    <input type="text" placeholder="Project ID" className="input input-bordered w-full max-w-xs mt-4" />
                    <button className="btn join-item ml-2">Search</button>
                </div>
                </dialog>
            </div>
        </>
    )
}

export default QuickActions
