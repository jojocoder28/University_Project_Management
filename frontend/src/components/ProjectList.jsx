
function ProjectList(props) {
    return (
        <>
            <div className="overflow-auto p-4">
                <div className="max-w-3/5 rounded-lg shadow-lg border border-slate-700 overflow-auto">
                    <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="border-b border-slate-700">
                        <th className="px-6 py-4 w-1/5 text-left">Project Name</th>
                        <th className="px-6 py-4 w-1/5 text-left">Supervisor Email</th>
                        <th className="px-6 py-4 w-3/5 text-left">Description</th>
                        <th className="px-6 py-4 w-1/5 text-left">Tags</th>
                        <th className="px-6 py-4 w-1/10">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.projects.map((project, index) => (
                            <tr key={index} className="cursor-pointer transition-color duration-300 hover:bg-gray-200 dark:hover:bg-slate-900">
                            <td className="px-6 py-4">{project.projectName}</td>
                            <td className="px-6 py-4">{project.supervisor}</td>
                            <td className="px-6 py-4 overflow-auto gap-2">
                                {project.description}
                            </td>
                            <td className="px-6 py-4 overflow-auto gap-2">
                                <div className="badge badge-neutral overflow-hidden">Python</div>
                                <div className="badge badge-neutral overflow-hidden">LangChain</div>
                                <div className="badge badge-neutral overflow-hidden">Cohere</div>
                            </td>
                            <td className="px-6 py-4">
                            {project.isApproved ? (
                                <div className="badge badge-neutral dark:bg-green-800 bg-green-500 overflow-hidden">Approved</div>):(<div className="badge badge-neutral bg-yellow-400 dark:bg-yellow-700 overflow-hidden">Pending</div>)
                            }
                            </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProjectList
