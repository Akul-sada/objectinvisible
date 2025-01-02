import React, { useState, useRef } from 'react';
import './App.css';

const ImageUploadBox = ({ bgColor, borderColor, label, onImageUpload }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        // Image Validation
        if (file) {
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!validTypes.includes(file.type)) {
                setError("Invalid file type. Please upload an Image.");
                return;
            }

            const maxSize = 12 * 1024 * 1024; // 12 MB
            if (file.size > maxSize) {
                setError("File is too large. Maximum size allowed is 12MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setError(null);
                onImageUpload(reader.result); // Notify parent of the uploaded image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click(); // Trigger the file input click on div click
    };

    return (
        <div className={`upload-box bg-${bgColor} border-${borderColor}`} onClick={handleClick}>
            <input 
                required 
                type='file' 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/jpeg,image/png,image/gif" 
                style={{ display: 'none' }} 
                capture="environment" // This attribute will prompt for the rear camera on mobile devices
            />
            {error && <div className='error-message'>{error}</div>}
            {!image ? (
                <div className='upload-text'>{label}</div>
            ) : (
                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={image} alt="uploaded" />
            )}
        </div>
    );
};

export default ImageUploadBox;