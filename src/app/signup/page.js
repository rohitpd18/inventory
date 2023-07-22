"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';
import {useRouter} from "next/navigation";


export default function Page() {
    const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorField, setErrorField] = useState(null);

  const fetchUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setErrorField("password");
      setLoading(false);
      return toast.error("Password does not match");
    }
    const res = await axios.post("/api/auth/signup", user);
    if (!res.data.success && res.data.errorField === "email") {
      setErrorField("email");
      setLoading(false);
      return toast.error("User already exists with this email");
    }
    
    if(res.data.success){
      toast.success(res.data.message);
      setLoading(false);
      router.push('/login');
      return
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={fetchUser}>
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium leading-6 text-gray-900 ${
                  errorField === "name" && "text-red-500"
                }`}
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={user.name}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errorField === "name" && "ring-2 ring-red-500"
                  }`}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium leading-6 text-gray-900 ${
                  errorField === "email" && "text-red-500"
                }`}
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={user.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errorField === "email" && "ring-2 ring-red-500"
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium leading-6 text-gray-900 ${
                    errorField === "password" && "text-red-500"
                  }`}
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={user.password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errorField === "password" && "ring-2 ring-red-500"
                  }`}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={user.confirmPassword}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 justify-center"
              >
                <span className="absolute self-center w-full h-0 transition-all duration-300 origin-center rotate-45  bg-indigo-600 top-1/2 group-hover:h-[25rem] group-focus:h-[25rem] group-hover:-translate-y-40 ease group-focus:-translate-y-40"></span>
                <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease group-focus-within:text-white">
                  Sign Up
                </span>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have a account?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
