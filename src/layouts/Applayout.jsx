import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import SideBar from './SideBar'

const Applayout = () => {
    return (
        <>
            <Header />
            <div className='flex gap-4 bg-white dark:bg-gray-900'>
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}

export default Applayout