"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const UpdateProduct = ({productToUpdate, view, setView, fetchProduct}) => {
  const [product, setProduct] = useState({});
  const [errorField, setErrorField] = useState(null);

  useEffect(() => { 
    setProduct(productToUpdate);
  },[productToUpdate])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/inventory/updateproduct", product);
    if (res.data.success) {
      toast.success(res.data.message);
      setView(false);
      fetchProduct()
    }
    else{
      toast.error(res.data.message);
    }
  }

  const handleDelete =async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/inventory/deleteproduct", product);
    if (res.data.success) {
      toast.success(res.data.message);
      setView(false);
      fetchProduct()
    }
    else{
      toast.error(res.data.message);
    }
  }

  return (
    <div className={`${!view && "hidden"} fixed inset-0 w-full z-50 flex items-center justify-center backdrop-blur-sm`}>
      <div className='bg-white rounded-lg shadow-lg w-[28rem] p-10'>
        <h3 className='mb-6 text-4xl font-extrabold text-center text-indigo-600'>Update product</h3>
      <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="productName"
              className={`${errorField=="productName"?"text-red-500":"text-gray-900"} block mb-2 text-sm font-medium `}
            >
              {product.productName}
            </label>
            <input
              name="productName"
              onChange={handleChange}
              value={product.productName}
              type="text"
              id="productName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your product name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="sku"
              className={`${errorField=="sku"?"text-red-500 border-red-500":"text-gray-900"} block mb-2 text-sm font-medium `}
            >
              Sku No
            </label>
            <input
              name="sku"
              value={product.sku}
              onChange={handleChange}
              type="text"
              id="sku"
              className={`${errorField=='sku'? "border-red-500": "border-gray-300"} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5`}
              placeholder="Enter Product sku No"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              type="text"
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your product category"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Quantity
            </label>
            <input
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              type="number"
              id="quantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className='flex justify-between'>
            <button
              type="submit"
              className="w-48 flex rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-green-600 text-green-600 justify-center"
            >
              <span className="absolute self-center w-full h-0 transition-all duration-300 origin-center rotate-45  bg-green-600 top-1/2 group-hover:h-[25rem] group-focus:h-[25rem] group-hover:-translate-y-48 ease group-focus:-translate-y-48"></span>
              <span className="relative text-green-600 transition duration-300 group-hover:text-white ease group-focus-within:text-white">
                Update Product
              </span>
            </button>
            <div
            onClick={()=>setView(false)}
              className="w-48 flex rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-yellow-500 text-yellow-500 justify-center"
            >
              <span className="absolute self-center w-full h-0 transition-all duration-300 origin-center rotate-45  bg-yellow-500 top-1/2 group-hover:h-[25rem] group-focus:h-[25rem] group-hover:-translate-y-48 ease group-focus:-translate-y-48"></span>
              <span className="relative text-yellow-500 transition duration-300 group-hover:text-white ease group-focus-within:text-white">
              Cancel 
              </span>
            </div>
          </div>
            <div
            onClick={handleDelete}
              className="w-48 flex rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-red-600 text-red-600 justify-center"
            >
              <span className="absolute self-center w-full h-0 transition-all duration-300 origin-center rotate-45  bg-red-600 top-1/2 group-hover:h-[25rem] group-focus:h-[25rem] group-hover:-translate-y-48 ease group-focus:-translate-y-48"></span>
              <span className="relative text-red-600 transition duration-300 group-hover:text-white ease group-focus-within:text-white">
              Delete
              </span>
            </div>
        </form>
        </div>
    </div>
  )
}

export default UpdateProduct