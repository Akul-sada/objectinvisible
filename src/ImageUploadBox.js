import React, { useState, useEffect } from 'react';

const ImageUploadBox = ({ bgColor, borderColor, label }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
  
    // Function to request camera permission
    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setPermissionGranted(true);
      } catch (error) {
        setError('Error requesting camera permission: ' + error.message);
      }
    };
  
    // Function to start the video stream
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        return stream;
      } catch (error) {
        setError('Error starting video stream: ' + error.message);
        return null;
      }
    };
  
    const handleCapture = async () => {
      if (!permissionGranted) {
        requestCameraPermission();
        return;
      }
  
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
  
      const stream = await startVideoStream();
      if (!stream) return; // Exit if we failed to get the stream
  
      video.srcObject = stream;
      video.play();
      
      video.addEventListener('playing', () => {
        // Draw the video frame on the canvas
        canvas.getContext('2d').drawImage(video, 0, 0, 640, 480);
        const imageData = canvas.toDataURL('image/jpeg');
        setImage(imageData);
        stream.getTracks().forEach((track) => track.stop());
      });
    };

  return (
    <div
    className={`upload-box bg-${bgColor} border-${borderColor}`} 
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
      onClick={handleCapture} // Trigger capture on div click
    >
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!image ? (<div className='upload-text'>{label}</div>):(<img style={{objectFit:'cover',width:'100%',height:'100%'}} src={image} alt="uploaded-image"/>)}
    </div>
  );
};

export default ImageUploadBox;