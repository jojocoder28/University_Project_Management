import UserData from '../components/UserData'
import ProjectList from '../components/ProjectList'
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import Loading from "../components/Loading.jsx";
import React, { useContext, useState, useEffect} from "react";
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { backend_api } from '../config.js';


const ProfileView = () => {
    document.title="Profile";
    const { email } = useParams();
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [user, setUser] = useState([]);
  const [project, setProject] = useState([]);
  const [numProjects, setNumprojects] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
    let [acceptance, setAcceptance] = useState(0);
    let [pending, setPending] = useState(0);
    const [date, setDate] = useState("");
  // const email=user.email;
  // console.log("user = ",user)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          backend_api+"api/v1/project/get/byemail",
          {
            params:{
                email:email
            },
            withCredentials: true,
          }
        );
        if(response.data.project.length!=0){
        setProject(response.data.project);
        setNumprojects(response.data.project.length);
        // setAcceptance(calculateTrueFalseRatio(response.data.project));
        const acceptanceRatio = await calculateTrueFalseRatio(response.data.project);
        setAcceptance(acceptanceRatio.ratio);
        setPending(acceptanceRatio.pending);
        setDate(response.data.project[response.data.project.length-1].creationDate);}
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
      finally{
        setIsLoading(false);
      }
    };
    fetchProject();
}, [isAuthenticated]);


useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          backend_api+"api/v1/user/profile",
          {
            params:{
                email:email
            },
            withCredentials: true,
          }
        );
       setUser(response.data.user);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
      finally{
        setIsLoading(false);
      }
    };
    fetchUser();
}, [isAuthenticated]);

const calculateTrueFalseRatio = async(item) => {
  const length=item.length;
  let count=0;
  let pending=length;
  if (length!=0){
  for(let i=0;i<length;i++){
      if (item[i].isApproved){
          count+=1;
          pending-=1;
      }
  }}
  const ratio = length === 0 ? 0 : (count / length) * 100;

  return {
      ratio: ratio.toFixed(2),
      pending: pending,
  };
};


    return (
        <>
    {isLoading ? (
      <Loading/>):(
            <div className="container mx-auto h-auto w-full">
                <div className="flex items-start justify-center">
                    <UserData 
                    fname={user.firstName} lname={user.lastName} role="User"
                    course={user.course} university={user.university} numProjects={numProjects} acceptance={acceptance} date={date} pending={pending}
                    view={true} user={user}
                    />
                </div>
                <div className="divider"></div>
                <div className="flex gap-5 w-full justify-center items-center">
                    <h2 className="text-2xl font-semibold text-center my-4">Projects</h2>
                    
                </div>
                {numProjects!==0 ? (<div className="flex w-full justify-center border-gray-700 rounded-md shadow-md">
                    <div className="max-w-3/5">
                        <ProjectList
                        projects={project}
                        view={true}
                        />
                    </div>
                </div>):(<div className="flex w-full justify-center border-gray-700 rounded-md shadow-md">
                    <div className="max-w-3/5">
                        No projects
                    </div>
                </div>)}
                
            </div>)}
        </>
    )
}

export default ProfileView
