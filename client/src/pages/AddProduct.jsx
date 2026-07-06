import React, { useContext, useState } from 'react'
import { Upload } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const AddProduct = () => {

  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image1 && !image2 && !image3 && !image4) {
      toast.error("Please upload at least one image")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const { data } = await axios.post(
        backendUrl + "/api/product/add",
        formData
      )

      if (data.success) {
        toast.success(data.message)
        setName("")
        setDescription("")
        setPrice("")
        setSizes([])
        setBestseller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const ImageBox = ({ image, setImage, id }) => (
    <label htmlFor={id} className='cursor-pointer'>
      <div className='w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-50 hover:border-indigo-400 transition-all'>
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt=""
            className='w-full h-full object-cover'
          />
        ) : (
          <Upload className='w-6 h-6 text-gray-400' />
        )}
      </div>
      <input
        type="file"
        id={id}
        accept="image/*"
        hidden
        onChange={(e) => setImage(e.target.files[0])}
      />
    </label>
  )

  return (
    <div className='max-w-2xl'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Add Product</h1>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>

        <div>
          <p className='mb-2 font-medium text-gray-700'>Upload Images</p>
          <div className='flex gap-3'>
            <ImageBox image={image1} setImage={setImage1} id="image1" />
            <ImageBox image={image2} setImage={setImage2} id="image2" />
            <ImageBox image={image3} setImage={setImage3} id="image3" />
            <ImageBox image={image4} setImage={setImage4} id="image4" />
          </div>
        </div>

        <div>
          <p className='mb-2 font-medium text-gray-700'>Product Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Classic Cotton Tee"
            className='w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:border-indigo-400'
          />
        </div>

        <div>
          <p className='mb-2 font-medium text-gray-700'>Product Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Write a short description"
            className='w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:border-indigo-400'
          />
        </div>

        <div className='flex gap-4 flex-wrap'>
          <div>
            <p className='mb-2 font-medium text-gray-700'>Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='px-4 py-2.5 border border-gray-300 rounded-md outline-none'
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2 font-medium text-gray-700'>Sub Category</p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className='px-4 py-2.5 border border-gray-300 rounded-md outline-none'
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className='mb-2 font-medium text-gray-700'>Price</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="e.g. 499"
              className='px-4 py-2.5 border border-gray-300 rounded-md outline-none w-32'
            />
          </div>
        </div>

        <div>
          <p className='mb-2 font-medium text-gray-700'>Sizes</p>
          <div className='flex gap-2'>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-1.5 rounded-md cursor-pointer border text-sm ${
                  sizes.includes(size)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={() => setBestseller((prev) => !prev)}
          />
          <label htmlFor="bestseller" className='text-gray-700 cursor-pointer'>
            Mark as Bestseller
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className='w-40 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all disabled:opacity-60'
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

      </form>
    </div>
  )
}

export default AddProduct