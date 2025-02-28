import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function AppLayout() {
    return (
        <div className='bg-gray-950 text-white min-h-screen'>
            <div className='container px-6 py-4 mx-auto'>
           {/* header */}
           <Sidebar/>>

           <main>
            <Outlet/>
           </main>
            </div>
        </div>
    )
}

export default AppLayout
