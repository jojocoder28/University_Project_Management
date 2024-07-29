import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { backend_api } from "../config.js";

const Register = () => {
  document.title="Register";

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [university, setUniversity] = useState("");
  const [dob, setDob] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [universities, setUniversities] = useState("");

  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          backend_api+"api/v1/university/getall" || "http://localhost:4000/api/v1/university/getall",
          {
            withCredentials: true,
          }
        );
        setUniversities(response.data.university);
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    };
    fetchUniversity();
  }, [isAuthenticated]);


  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios
        .post(
          backend_api+"api/v1/user/register" || "http://localhost:4000/api/v1/user/register",
          { firstName, lastName, email, university, course, dob, phone, username, gender, password, confPassword },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setCourse("");
          setUniversity("");
          setDob("");
          setPhone("");
          setUsername("");
          setGender("");
          setPassword("");
          setConfPassword("");

        });
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }


  return (
    <>
    {isLoading ? (
      <Loading />
    ):(
    <div className="min-h-screen flex justify-center py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold py-10 cursor-default select-none">
                  <span>Sign</span><span className="animate-pulse text-teal-500">Up</span>
                </h2>
              </div>
              <form className="w-full max-w-lg" onSubmit={handleRegistration}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                      First Name
                    </label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Last Name
                    </label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Email
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@example.com"/>
                    
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full relative px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      University
                    </label>
                    <select value={university} onChange={(e) => setUniversity(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="university-grid">
                    <option value={null}>Select University...</option>
                      {universities && universities.length > 0 ? (
                        universities.map((element)=>{
                          return(
                              <option key={element.universityId} value={element.universityName}>{element.universityName+" ("+element.acronym+")"}</option>
                            )
                          })
                        ):(
                          <option value="NA">No university registered</option>
                        )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 pt-6 right-2 flex items-center justify-center px-2 text-gray-700">
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    {/* <input value={university} onChange={(e) => setUniversity(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-university" type="text" placeholder="Name of your University"/> */}
                    
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Course
                    </label>
                    <input value={course} onChange={(e) => setCourse(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-course" type="text" placeholder="BSc/BA/MSc/MA/MCA/BTech"/>
                    
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Date of Birth
                    </label>
                    <input value={dob} onChange={(e) => setDob(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-dob" type="date" placeholder="DD-MM-YYYY"/>
                    
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Username
                    </label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" type="text" placeholder="Make it Unique"/>
                   
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Password
                    </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                    <p className="text-gray-600 text-xs italic dark:text-gray-200">Make it as long and as crazy as you'd like</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Confirm Password
                    </label>
                    <input value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-confpassword" type="text" placeholder="Re-Type Your Password"/>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                      Phone
                    </label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="9876540321"/>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                      Gender
                    </label>
                    <div className="relative">
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option value="">Select Gender...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center py-6 items-center">
                  <button className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded items-center justify-center" type="submit">
                    Signup
                  </button>
                </div>
                <p className="flex items-center align-middle justify-center my-2 text-gray-600 text-s dark:text-gray-200">
                    <p>Already registered? </p>
                    <a href="/login" className="text-blue-500 dark:hover:text-teal-500 hover:animate-pulse overflow-hidden hover:text-teal-500">&nbsp; Login</a>
                  </p>
              </form>
            </div>
        </div>
      )}
      </>
  )
}

export default Register