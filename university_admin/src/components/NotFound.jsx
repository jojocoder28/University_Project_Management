import React from 'react';
import NavBar from './NavBar';

const NotFound = () => {
  document.title="Not Found";
  
  return (
    <>
    <div className="flex flex-col items-center justify-start pb-4">
      <NavBar activeTab="" />
    </div>
    <h1>404 - Not Found</h1>
    
  </>
)
};

export default NotFound;