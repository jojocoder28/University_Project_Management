// FileUpload.jsx
import React, { useState } from 'react';

const FileUpload = ({ setSelectedFiles }) => {
    const [fileNames, setFileNames] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        // Update file names list
        const names = files.map(file => file.name);
        setFileNames(names);
    };

    return (
        <div className="file-upload">
            <input
                type="file"
                name='extra'
                multiple
                onChange={handleFileChange}
                className="file-input"
            />
            <ul className="file-names">
                {fileNames.map((name, index) => (
                    <li key={index} className="file-name">{name}</li>
                ))}
            </ul>
            <style>{`
                .file-upload {
                    margin-top: 1rem;
                }
                .file-input {
                    margin-bottom: 1rem;
                }
                .file-names {
                    list-style-type: none;
                    padding: 0;
                }
                .file-name {
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }
            `}</style>
        </div>
    );
};

export default FileUpload;
