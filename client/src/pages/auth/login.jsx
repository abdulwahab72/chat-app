import React, { useState } from "react";
import HeaderComponent from "../components/Header/header";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/auth/auth";
import { toast } from "sonner";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "" && formData.password === "") {
      setError("Please fill above fields");
    }
    //  else {
    //   // navigate("/signup");
    // }
    try {
      const response = await loginUser(formData);
      console.log("first", response);
      if (response?.token) {
        setFormData({ email: "", password: "" });
        toast("Login Successfull!");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <HeaderComponent />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-1/2 flex justify-between">
          <div className="w-1/2 h-full flex items-center justify-center">
            <p className="text-center">Welcome to the Chat App</p>
          </div>
          <div className="flex-col items-center w-full space-y-4">
            <p className="text-lg font-bold">Login to Your Account</p>
            <Input
              name="email"
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="outline-none w-full"
            />
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              className="outline-none w-full"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-sm">
              If you don't have account!
              <span
                onClick={() => navigate("/signup")}
                className="hover:underline cursor-pointer "
              >
                {" "}
                Register your account
              </span>
            </p>
            <Button onClick={handleSubmit} className="text-white">
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
