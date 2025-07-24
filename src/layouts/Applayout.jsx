import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import SideBar from './SideBar'

const Applayout = () => {

    const [isSidebarOpen, setisSidebarOpen] = useState(false);
    const toggleSidebar = () => setisSidebarOpen(!isSidebarOpen)

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />
            <div className='flex gap-4 bg-white dark:bg-gray-900'>
                <SideBar isSidebarOpen={isSidebarOpen} />
                <Outlet />
            </div>
        </>
    )
}

export default Applayout