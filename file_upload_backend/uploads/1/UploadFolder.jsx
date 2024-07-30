import React, { useState } from 'react';

function UploadFolder() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('folder', selectedFile);

        const response = await fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Folder uploaded successfully');
        } else {
            alert('Failed to upload folder');
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} webkitdirectory="true" />
            <button type="submit">Upload Folder</button>
        </form>
    );
}

export default UploadFolder;
