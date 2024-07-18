import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import AdminData from '../components/AdminData'
import QuickActions from '../components/QuickActions'
import Tabs from '../components/Tabs'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from "react-router-dom";


function Dashboard() {
  const navigateTo = useNavigate();

    const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
      }
    return (
        <>
        <div className="flex flex-col items-center justify-start pb-4">
        <NavBar activeTab="Home" />
        </div>
                <AdminData admin={admin[0]}/>
                <QuickActions />                
                <Tabs />
        </>
    )
}

export default Dashboard;
