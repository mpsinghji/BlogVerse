import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AdminNavigation from './AdminNavigation'
import { useSelector } from 'react-redux'

const AdminLayout = () => {
    const {user}= useSelector((state) => state.auth);
    if(!user || user.role !== 'admin'){
        return <Navigate to='/login' />

    }
  return (
    <div className='container mx-auto flex flex-col mt-20 md:flex-row gap-4 items-start justify-start'>
        <header>
            <AdminNavigation />
        </header>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default AdminLayout