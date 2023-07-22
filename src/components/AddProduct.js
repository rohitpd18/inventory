"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Addproduct = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [errorField, setErrorField] = useState(null);
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    quantity: "",
    sku: "",
  });

  const getUserId= async ()=>{
    try {
      const response = await axios.get("/api/auth/me");
      console.log(response);
      if (response.data.success) {
        setProduct((prev)=>{return {...prev, userId: response.data.userId}})
      } else {
        // Handle error case
        console.error("Error getting user id");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getUserId()
  }, [])

  useEffect(() => {
    if (
      product.productName.length > 0 &&
      product.category.length > 0 &&
      product.quantity.length > 0 &&
      product.sku.length > 0
    ) {
      setButtonDisable(false);
    } else {
        setButtonDisable(true);
    }
  }, [product]);

  // post request to /api/inventory/addproduct
  const handleSubmit = async (e) => {
    e.preventDefault();


    if(product.productName.length == 0){
        setErrorField(productName)
        console.log(errorField+"asdf")
    }
    try {
      const response = await axios.post("/api/inventory/addproduct", product);
      console.log(response);
      if (!response.data.success && response.data.errorField) {
            setErrorField(response.data.errorField)
            toast.error(response.data.message);
            return console.log(response.data.message);
      }

      if (response.data.success) {
        setErrorField(null)
        // Product added successfully
        toast.success(response.data.message);
        setProduct({...product,
          productName: "",
          category: "",
          quantity: "",
          sku: "",
        });
      } else {
        // Handle error case
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // fucntion to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Manage Product with Mysite
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably haven
            heard of them man bun deep.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="productName"
              className={`${errorField=="productName"?"text-red-500":"text-gray-900"} block mb-2 text-sm font-medium `}
            >
              Product Name
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
          <div>
            <button
              type="submit"
              className="w-48 flex rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 justify-center"
            >
              <span className="absolute self-center w-full h-0 transition-all duration-300 origin-center rotate-45  bg-indigo-600 top-1/2 group-hover:h-[25rem] group-focus:h-[25rem] group-hover:-translate-y-48 ease group-focus:-translate-y-48"></span>
              <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease group-focus-within:text-white">
                Add Product
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Addproduct;
