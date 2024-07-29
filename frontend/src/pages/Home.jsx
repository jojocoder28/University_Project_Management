import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import CardsHome from '../components/CardsHome.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { backend_api } from '../config.js';
import ProjectList from '../components/ProjectList.jsx';
import { Context } from '../main.jsx';

const Home = () => {
  document.title="Unifolio";
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    try {
      const response = await axios.get(backend_api+'api/v1/project/search', {
        params: { query: searchTerm }
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };
      const title1="Unifolio: Streamline your university projects with ease, collaboration, and efficiency";
      const desc1="Unifolio is a comprehensive university project management website designed to streamline academic projects. It offers features such as task tracking, file sharing, collaborative tools, and deadline reminders. With Unifolio, students and faculty can manage projects efficiently, ensuring better organization and communication. The platform supports seamless collaboration, making it easy to coordinate tasks, share resources, and monitor progress. Ideal for both individual and group projects, Unifolio enhances productivity and helps users stay on top of their academic commitments"
  return ( <>
    <main>
      <div className="container mx-auto">
        <div className="flex mb-4 p-4">
          <CardsHome title={title1} description={desc1} wh="lg:w-8/12 h-96"/>
          <div className="lg:w-4/12 h-96 lg:block hidden overflow-hidden">
            <div className="flex align-middle justify-center text-center items-center relative">
              <img src="https://github.githubassets.com/assets/bg-a352b7ab2e3b.png" width={370} className='box rounded-xl h-96 relative bg-cover z-0'/>
               <div className="absolute flex top-10 left-20 overflow-hidden"> 
                <img src='/white-logo.png' height={70} width={70}/>
                <span className='text-3xl px-5 relative top-5 font-bold text-white'> n i f o l i o </span>
              </div>
              <div className="absolute px-12 text-white">
              Sign in to Unifolio today and streamline your university projects. Easy management, collaboration, and success await
              </div>
              <div className="absolute bottom-12">
                { !isAuthenticated ? (

                  <a href='/register' className='btn btn-wide dark:bg-slate-800 dark:hover:bg-teal-900 bg-blue-200 border-0 hover:bg-teal-500'>Register</a>
                ) : (
                  <a href='/project/add' className='btn btn-wide dark:bg-slate-800 dark:hover:bg-teal-900 bg-blue-200 border-0 hover:bg-teal-500'>Create Project</a>

                )
                }
                </div>
            </div>
          </div>
        </div>
        {/* <div className="flex mb-4 p-4">
          <CardsHome title={title1} description={desc1} wh="lg:w-full h-84"/>
        </div> */}
        <div className="container mx-auto">
          <SearchBar onSearch={handleSearch} />
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 mx-5 gap-4">
              {searchResults.length > 0 ? (
                
                      <ProjectList
                        projects={searchResults}
                        view={true}
                      />
                
              ) : (
                <div>No projects found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
    </>
  )
}

export default Home