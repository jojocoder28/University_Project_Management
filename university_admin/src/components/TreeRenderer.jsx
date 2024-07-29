// src/components/TreeRenderer.jsx
import React from 'react';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';

const TreeRenderer = ({ node, depth = 0, expandedDirs, toggleDirectory, handleFileSelect }) => {
  if (!node.children) return null;

  return (
    <ul style={{ marginLeft: depth * 20 }}>
      {node.children.map((child, index) => {
        const childPath = `${node.name}/${child.name}`;
        return (
          <li key={index} style={{ marginBottom: '5px' }}>
            {child.isDirectory ? (
              <>
                <div 
                  onClick={() => toggleDirectory(childPath)} 
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {expandedDirs[childPath] ? <FaFolderOpen /> : <FaFolder />}
                  <strong style={{ marginLeft: '5px' }}>{child.name}</strong>
                </div>
                {expandedDirs[childPath] && (
                  <TreeRenderer 
                    node={child} 
                    depth={depth + 1} 
                    expandedDirs={expandedDirs} 
                    toggleDirectory={toggleDirectory}
                    handleFileSelect={handleFileSelect} // Pass the handler here
                  />
                )}
              </>
            ) : (
              <div 
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => handleFileSelect(child.name)} // Use handleFileSelect on file click
              >
                <FaFile />
                <a style={{ marginLeft: '5px' }}>{child.name}</a>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TreeRenderer;
