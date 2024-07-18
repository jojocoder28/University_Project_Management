import React from 'react'
import NavBar from '../components/NavBar'
import AdminData from '../components/AdminData'
import QuickActions from '../components/QuickActions'
import Tabs from '../components/Tabs'

function Dashboard() {
    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen w-screen gap-4">
<<<<<<< HEAD
                <NavBar activeTab="Home" />
=======
>>>>>>> upstream/main
                <AdminData />
                <QuickActions />                
                <Tabs />
            </div>
        </>
    )
}

export default Dashboard
