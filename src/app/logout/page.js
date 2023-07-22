"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()
  const handleLogout = async () => {
    const res = await axios.get("api/auth/logout");
    if (res.data.success) {
      toast.success(res.data.message);
      return router.push("/login");
    } else {
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>page</div>;
};

export default Page;
