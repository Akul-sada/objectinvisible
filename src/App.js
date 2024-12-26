import React, { useState, useEffect } from 'react';
import './App.css';
import ImageUploadBox from './ImageUploadBox';
import './InputSubmitButton.css';
import Modal from './Modal'; // Import the Modal component

function App() {
  const [images, setImages] = useState({
    objectImage: null,
    initialPoint: null,
    finalPoint: null,
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleImageUpload = (image, type) => {
    setImages((prevImages) => ({ ...prevImages, [type]: image }));
  };

  useEffect(() => {
    if (images.objectImage && images.initialPoint && images.finalPoint) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [images]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      setShowModal(true); // Show the modal when form is invalid
      return;
    }

    // Proceed with the form submission
    console.log("All required images uploaded, proceeding with submission...");
    window.location.reload(); // Reloading for demonstration purpose
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>

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
          <input type="submit" className="button-71" value="Submit" />
        </div>
      </form>
      <Modal 
        isOpen={showModal} 
        onClose={closeModal} 
        message="Please upload all the required photos before submitting the form." 
      /> {/* Include the modal */}
    </div>
  );
}

export default App;