import React, { useContext } from 'react'
import { Hand } from 'lucide-react'
import { AppContext } from '../context/AppContext'

const Header = () => {
  const { userData } = useContext(AppContext)
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Developer"
          alt="profile"
          className='w-36 h-36 rounded-full mb-6 bg-white'
        />
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
          Hey {userData ? userData.name : 'Developer'}
          <Hand className='w-8 h-8 text-yellow-500' />
        </h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
        <p className='mb-8 max-w-md'>Let's start with a quick product tour and we will have you up and running in on time!</p>
        <button className='cursor-pointer border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Header