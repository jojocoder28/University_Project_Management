// ImageUpload.jsx
import React, { useState } from 'react';

const ImageUpload = ({ setSelectedImages }) => {
    const [previewImages, setPreviewImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);

        // Create image previews
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previewUrls);
    };

    return (
        <div className="image-upload">
            <input
                type="file"
                name='images'
                multiple
                onChange={handleImageChange}
                className="file-input"
            />
            <div className="image-previews">
                {previewImages.map((preview, index) => (
                    <img key={index} src={preview} alt={`preview-${index}`} className="preview-image" />
                ))}
            </div>
            <style>{`
                .image-upload {
                    margin-top: 1rem;
                }
                .file-input {
                    margin-bottom: 1rem;
                }
                .image-previews {
                    display: flex;
                    gap: 1rem;
                }
                .preview-image {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
};

export default ImageUpload;
