import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('id')
    navigate('/admin/login');
  }

  return (
    <div className="bg-gray-800 h-screen w-64 px-4 py-8">
  <div className="flex items-center mb-8">
  <Link to="/" className="p-2">
      {/* <img src='/logo.jpg' width={150} height={150}  /> */}
    </Link>
  </div>
  <ul>
  
  <ul className='pt-32'>
    <li className='py-4'>
      <Link to="/" className='text-gray-400 hover:text-white text-3xl'>Home</Link>
    </li>
    <li className='py-4'>
      <Link to="/admin/create/catalog" className="text-gray-400 hover:text-white text-3xl">Create Catalog</Link>
    </li>
    <li className='py-4'>
      <Link to="/admin/create/menu" className="text-gray-400 hover:text-white text-3xl">Create Menu</Link>
    </li>
    <li className='py-4'>
      <Link to="/admin/create/banner" className="text-gray-400 hover:text-white text-3xl">Create Banner</Link>
    </li>
    <li className='py-4'>
      <div to="/admin/logout" className="text-gray-400 hover:text-white text-3xl" onClick={handleLogout}>Log Out</div>
    </li>
  </ul>

  </ul>
</div>

  )
}
