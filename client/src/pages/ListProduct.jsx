import React, { useContext, useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const ListProduct = () => {

  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/product/list")
      if (data.success) {
        setList(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/product/remove", { id })
      if (data.success) {
        toast.success(data.message)
        fetchList()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (loading) {
    return <p className='text-gray-500'>Loading products...</p>
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>All Products</h1>

      <div className='flex flex-col gap-2'>

        <div className='hidden md:grid grid-cols-[80px_1fr_1fr_1fr_60px] items-center gap-4 px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-600'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span></span>
        </div>

        {list.length === 0 && (
          <p className='text-gray-500 mt-4'>No products added yet.</p>
        )}

        {list.map((item) => (
          <div
            key={item._id}
            className='grid grid-cols-[80px_1fr_1fr_1fr_60px] items-center gap-4 px-4 py-3 border border-gray-200 rounded-md'
          >
            <img
              src={item.image?.[0]}
              alt={item.name}
              className='w-14 h-14 object-cover rounded-md bg-gray-100'
            />
            <p className='text-gray-800 text-sm'>{item.name}</p>
            <p className='text-gray-600 text-sm'>{item.category}</p>
            <p className='text-gray-600 text-sm'>${item.price}</p>
            <button
              onClick={() => removeProduct(item._id)}
              className='text-red-500 hover:text-red-700 cursor-pointer justify-self-center'
            >
              <Trash2 className='w-5 h-5' />
            </button>
          </div>
        ))}

      </div>
    </div>
  )
}

export default ListProduct