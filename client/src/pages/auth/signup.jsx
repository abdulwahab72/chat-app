import React, { useState } from "react";
import HeaderComponent from "../components/Header/header";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupUser } from "@/services/auth/auth";
import { toast } from "sonner";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.userName === "" &&
      formData.email === "" &&
      formData.password === ""
    ) {
      setError("Please fill above fields");
    }
    try {
      const response = await signupUser(formData);
      if (response?.success) {
        setFormData({ userName: "", email: "", password: "" });
        toast("Signup successfully! Please login now!");
        navigate("/login");
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
            <p>Signup to Your Account</p>
            <Input
              name="userName"
              type="text"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              placeholder="Enter your user name"
              className="outline-none w-full"
            />
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
            {error && <p className="text-sm text-red-500">{error}</p>}
            <p>
              If you have account!
              <span
                onClick={() => navigate("/login")}
                className="hover:underline cursor-pointer"
              >
                {" "}
                Login your account
              </span>
            </p>
            <Button onClick={handleSubmit} className="text-white">
              Signup
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
