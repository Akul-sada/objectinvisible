import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const ImageUploadBox = ({ bgColor, borderColor, label, onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Request to access user's camera
  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      setError("Error accessing camera: " + err.message);
    }
  };

  // Capture the image from the video stream
  const handleCapture = () => {
    const canvas = canvasRef.current;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    setImage(imageData);
    setError(null);
    onImageUpload && onImageUpload(imageData); // Notify parent of the uploaded image
  };

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
  }

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  }

  useEffect(() => {
    const videoElement = videoRef.current; // Copy the current value to a variable
  
    // Cleanup stream on component unmount
    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop()); // Stop all video tracks
      }
    };
  }, [videoRef]); // Add videoRef to the dependency array

  return (
    <div className={`upload-box bg-${bgColor} border-${borderColor}`} onClick={handleClick}>
      <input 
        required 
        type='file' 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/jpeg,image/png,image/gif" 
        style={{ display: 'none' }} 
      />
      {error && <div className='error-message'>{error}</div>}
      {!image ? (
        <>
          <div className='upload-text'>{label}</div>
          <button onClick={handleCameraAccess} style={{ display: 'none' }}>Open Camera</button>
          <video ref={videoRef} width="320" height="240" style={{ display: 'none' }}></video>
          <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }}></canvas>
          <button onClick={handleCapture} style={{ display: 'none' }}>Capture Photo</button>
        </>
      ) : (
        <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={image} alt="uploaded-image" />
      )}
    </div>
  );
};

export default ImageUploadBox;