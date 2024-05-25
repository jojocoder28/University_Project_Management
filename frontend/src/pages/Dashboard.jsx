import UserData from '../components/UserData'
import ProjectList from '../components/ProjectList'
function Dashboard() {
    return (
        <>
            <div className="container mx-auto h-auto w-full">
                <div className="flex items-start justify-center">
                    <UserData 
                    name="Carl Johnson" role="Student" 
                    location="Los Santos" university="Los Santos Public University"
                    />
                </div>
                <div className="divider"></div>
                <div className="flex gap-5 w-full justify-center items-center">
                    <h2 className="text-2xl font-semibold text-center my-4">Projects</h2>
                    <div className="flex justify-center">
                        <button className="btn btn-primary hover:bg-amber-500 dark:hover:bg-slate-900 shadow-md">Add Project</button>
                    </div>
                </div>
                <div className="flex w-full justify-center border-gray-700 rounded-md shadow-md">
                    <div className="max-w-3/5">
                        <ProjectList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
