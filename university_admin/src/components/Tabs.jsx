// src/components/Tabs.js
import React, { useState } from 'react';
import Table from './Table';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="container mt-10 py-4 pl-9 pr-12">
      <div role="tablist" className="tabs tabs-boxed">
        <a
          role="tab"
          className={`tab tab-bordered ${activeTab === 0 ? 'tab-active' : ''}`}
          onClick={() => handleTabClick(0)}
        >
          New Projects
        </a>
        <a
          role="tab"
          className={`tab tab-bordered ${activeTab === 1 ? 'tab-active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          Students Enrolled
        </a>
      </div>
      <div className="mt-4">
        {activeTab === 0 && <div><Table title="Project" th={["Project Name", "Tags", "Contributors"]} /></div>}
        {activeTab === 1 && <div><Table title="Students" th={["Name", "Department", "Niche"]} /></div>}
      </div>
    </div>
  );
};

export default Tabs;
