import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {backend_api} from "../config.js";

const Login = () => {
  document.title="Login";

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const navigateTo = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          backend_api+"api/v1/user/login" || "http://localhost:4000/api/v1/user/login",
          { email, password, role },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setRole("");

        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }


  return (
    <div className="min-h-screen flex justify-center py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold py-10 overflow-hidden cursor-default select-none">
                  <span>Log</span><span className="animate-pulse text-teal-500">in</span>
                </h2>
              </div>
              <form className="w-full max-w-lg" onSubmit={handleLogin}>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Email
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@example.com"/>
                    
                  </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Password
                    </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                  </div>
                </div>
                
                <div className="flex justify-center pt-2 items-center">
                  <button className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded items-center justify-center" type="submit">
                    Login
                  </button>
                </div>
                  <p className="flex items-center align-middle justify-center mt-5 text-gray-600 text-s dark:text-gray-200">
                    <p>New to this platform? </p>
                    <a href="/register" className="text-blue-500 dark:hover:text-teal-500 hover:animate-pulse overflow-hidden hover:text-teal-500">&nbsp; Sign up</a>
                  </p>
              </form>
            </div>
        </div>
  )
}

export default Login