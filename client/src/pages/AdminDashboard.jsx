import React, { useContext } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { PlusCircle, List, LogOut, Sparkles } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const AdminDashboard = () => {

  const navigate = useNavigate()
  const { backendUrl } = useContext(AppContext)

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      // Adjust this path to match whatever your actual admin logout route is
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      if (data.success) {
        navigate('/login')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-all ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`

  return (
    <div className='min-h-screen flex bg-gray-50'>

      {/* Sidebar */}
      <aside className='w-60 bg-white border-r border-gray-200 flex flex-col justify-between'>
        <div>
          <div className='flex items-center gap-2 px-6 py-6 border-b border-gray-200'>
            <Sparkles className='w-6 h-6 text-indigo-600' />
            <span className='font-bold text-gray-800 text-lg'>MyApp Admin</span>
          </div>

          <nav className='flex flex-col gap-1 p-4'>
            <NavLink to='/admin/add-product' className={linkClass}>
              <PlusCircle className='w-5 h-5' />
              Add Product
            </NavLink>
            <NavLink to='/admin/list-product' className={linkClass}>
              <List className='w-5 h-5' />
              List Products
            </NavLink>
          </nav>
        </div>

        <button
          onClick={logout}
          className='flex items-center gap-3 px-4 py-2.5 m-4 rounded-md text-sm text-red-500 hover:bg-red-50 transition-all cursor-pointer'
        >
          <LogOut className='w-5 h-5' />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className='flex-1 p-8 overflow-y-auto'>
        <Outlet />
      </main>

    </div>
  )
}

export default AdminDashboard