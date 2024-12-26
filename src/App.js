import React, { useState } from 'react';
import './App.css';
import ImageUploadBox from './ImageUploadBox';
import './InputSubmitButton.css';

function App() {
  const [images, setImages] = useState({
    objectImage: null,
    initialPoint: null,
    finalPoint: null,
  });

  const handleImageUpload = (image, type) => {
    setImages((prevImages) => ({ ...prevImages, [type]: image }));
  };

  const handleSubmit = () => {
    if (!images.objectImage) {
      alert("Please upload the object image");
      return;
    }
    
    if (!images.initialPoint) {
      alert("Please upload the initial point image");
      return;
    }
    
    if (!images.finalPoint) {
      alert("Please upload the final point image");
      return;
    }

    console.log("All images uploaded successfully!");
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="upload-boxes-parent">
        <ImageUploadBox
          bgColor="red"
          borderColor="red"
          label="Upload the object image"
          onImageUpload={(image) => handleImageUpload(image, 'objectImage')}
        />
        <ImageUploadBox
          bgColor="orange"
          borderColor="orange"
          label="Upload the object's initial point"
          onImageUpload={(image) => handleImageUpload(image, 'initialPoint')}
        />
        <ImageUploadBox
          bgColor="blue"
          borderColor="blue"
          label="Upload the object final point"
          onImageUpload={(image) => handleImageUpload(image, 'finalPoint')}
        />
      </div>
      <div className="statement">
        <h2>
          <span className="bg-red">THIS OBJECT IS COMPLETELY OUT</span>{' '}
          <span className="bg-orange">FROM THIS POINT{' '}
            <span>&amp;</span>
          </span>{' '}
          <span className="bg-blue">COMPLETELY IN AT THIS POINT{' '}
            <span style={{ fontSize: '9rem' }}>&infin;</span>
          </span>
        </h2>
      </div>
      <div>
        <button 
          type="button" 
          className="button-71" 
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;