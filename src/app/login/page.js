"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorField, setErrorField] = useState(null);

  const fetchUser = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await axios.post("/api/auth/login", user);
      if (!res.data.success) {
        if (res.data.errorField === "email") {
          setErrorField("email");
          setLoading(false);
          return toast.error("User doesn't exists with this email");
        } else if (res.data.errorField === "password") {
          setErrorField("password");
          setLoading(false);
          return toast.error("Invalid Credentials");
        }
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setErrorField(null);
        setLoading(false);
        router.push("/");
        return;
      }
    } catch (error) {
      console.log(error);
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
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={fetchUser}>
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
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
              <button
                type="submit"
                className="w-full flex rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 justify-center"
              >
                <span className="absolute self-center w-full h-0 transition-all duration-300 origin-center rotate-45  bg-indigo-600 top-1/2 group-hover:h-[25rem] group-focus:h-[25rem] group-hover:-translate-y-40 ease group-focus:-translate-y-40"></span>
                <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease group-focus-within:text-white">
                  Login
                </span>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/trial"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
