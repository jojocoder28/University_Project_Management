import React from 'react'
import NavBar from '../components/NavBar'
import AdminData from '../components/AdminData'
import QuickActions from '../components/QuickActions'
import Tabs from '../components/Tabs'

function Dashboard() {
    return (
        <>
                <AdminData />
                <QuickActions />                
                <Tabs />
        </>
    )
}

export default Dashboard;
