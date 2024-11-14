import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    imagge_2: '',
    image_3: '',
    cpu: '',
    ram: '',
    sd: '',
    manhinh: '',
    card: ''
  })

  const [selectedFiles, setSelectedFiles] = useState({
    image: null,
    imagge_2: null,
    image_3: null
  })

  const [notification, setNotification] = useState({ show: false, message: '', type: '' })

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' })
    }, 3000)
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        showNotification('Error fetching product', 'error')
      }
    }
    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0]
    setSelectedFiles(prev => ({
      ...prev,
      [fieldName]: file
    }))
    
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProduct(prev => ({
          ...prev,
          [fieldName]: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    
    Object.keys(product).forEach(key => {
      if (key !== 'image' && key !== 'imagge_2' && key !== 'image_3') {
        formData.append(key, product[key])
      }
    })

    if (selectedFiles.image) formData.append('image', selectedFiles.image)
    if (selectedFiles.imagge_2) formData.append('imagge_2', selectedFiles.imagge_2)
    if (selectedFiles.image_3) formData.append('image_3', selectedFiles.image_3)

    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'PUT',
        body: formData
      })

      if (response.ok) {
        showNotification('Product updated successfully', 'success')
        setTimeout(() => {
          navigate('/dashboard/productadmin')
        }, 2000)
      } else {
        throw new Error('Failed to update product')
      }
    } catch (error) {
      showNotification('Error updating product', 'error')
    }
  }

  const Notification = ({ message, type }) => (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      <div className="flex items-center">
        {type === 'success' ? (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  )

  return (
    <div>
      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="bg-slate-600 w-[98%] h-auto mt-[-80px] p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 grid-rows-8 gap-4">
            <div className="col-span-2">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="col-span-2 col-start-3">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="col-span-2 row-span-2 row-start-2">
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                />
              </div>
            </div>

            <div className="col-span-2 row-span-2 col-start-3 row-start-2">
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">
                  Main Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image')}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {product.image && (
                  <img 
                    src={product.image} 
                    alt="Preview" 
                    className="mt-2 h-32 object-contain"
                  />
                )}
              </div>
            </div>

            <div className="col-span-2 row-span-2 row-start-4">
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">
                  Image 2
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'imagge_2')}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {product.imagge_2 && (
                  <img 
                    src={product.imagge_2} 
                    alt="Preview" 
                    className="mt-2 h-32 object-contain"
                  />
                )}
              </div>
            </div>

            <div className="col-span-2 row-span-2 col-start-3 row-start-4">
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">
                  Image 3
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image_3')}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {product.image_3 && (
                  <img 
                    src={product.image_3} 
                    alt="Preview" 
                    className="mt-2 h-32 object-contain"
                  />
                )}
              </div>
            </div>

            <div className="col-span-2 row-start-6">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="col-span-2 col-start-3 row-start-6">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  CPU
                </label>
                <input
                  type="text"
                  name="cpu"
                  value={product.cpu}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="col-span-2 row-start-7">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  RAM
                </label>
                <input
                  type="text"
                  name="ram"
                  value={product.ram}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="col-span-2 col-start-3 row-start-7">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Storage
                </label>
                <input
                  type="text"
                  name="sd"
                  value={product.sd}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="col-span-2 row-start-8">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Display
                </label>
                <input
                  type="text"
                  name="manhinh"
                  value={product.manhinh}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="col-span-2 col-start-3 row-start-8">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Graphics Card
                </label>
                <input
                  type="text"
                  name="card"
                  value={product.card}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="col-span-4 mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
