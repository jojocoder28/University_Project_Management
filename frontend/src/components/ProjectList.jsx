
function ProjectList(props) {
    return (
        <>
            <div className="overflow-auto p-4">
                <div className="max-w-3/5 rounded-lg shadow-lg border border-slate-700 overflow-auto">
                    <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="border-b border-slate-700">
                        <th className="px-6 py-4 w-1/2 text-left">Project Name</th>
                        <th className="px-6 py-4 w-2/5 text-left">Tags</th>
                        <th className="px-6 py-4 w-1/10">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="cursor-pointer transition-color duration-300 hover:bg-gray-500 dark:hover:bg-slate-900">
                        <td className="px-6 py-4">Efficient In-context Example Selection for In-context Transfer Learning using LLMs</td>
                        <td className="flex px-6 py-4 overflow-auto gap-2">
                            <div className="badge badge-neutral overflow-hidden">Python</div>
                            <div className="badge badge-neutral overflow-hidden">LangChain</div>
                            <div className="badge badge-neutral overflow-hidden">Cohere</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="badge badge-neutral bg-green-800 overflow-hidden">Accepted</div>
                        </td>
                        </tr>
                        {props.projects.map((project, index) => (
                            <tr key={index} className="cursor-pointer transition-color duration-300 hover:bg-gray-500 dark:hover:bg-slate-900">
                            <td className="px-6 py-4">{project}</td>
                            <td className="flex px-6 py-4 overflow-auto gap-2">
                                <div className="badge badge-neutral overflow-hidden">Python</div>
                                <div className="badge badge-neutral overflow-hidden">LangChain</div>
                                <div className="badge badge-neutral overflow-hidden">Cohere</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="badge badge-neutral bg-green-800 overflow-hidden">Accepted</div>
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
