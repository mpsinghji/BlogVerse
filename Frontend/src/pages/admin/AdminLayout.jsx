import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';
import { useSelector } from 'react-redux';

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== 'admin') {
    return <Navigate to='/login' />;
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-gray-50 pt-15'>
      <aside className='w-full md:w-1/6 bg-purple-100 md:min-h-screen p-4 '>
        <AdminNavigation />
      </aside>

      <main className='flex-1 p-5 bg-white'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
