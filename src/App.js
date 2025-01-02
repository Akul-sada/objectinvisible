import React, { useState } from 'react';
import './App.css';
import ImageUploadBox from './ImageUploadBox';
import './InputSubmitButton.css';
import Modal from 'react-modal';


function App() {
  const [images, setImages] = useState({
    objectImage: null,
    // initialPoint: null,
    finalPoint: null,
  });

  // code to open and close modal
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  const handleImageUpload = (image, type) => {
    setImages((prevImages) => ({ ...prevImages, [type]: image }));
  };

  const handleSubmit = () => {
    if (!images.objectImage) {
      alert("Please upload the object image");
      return;
    }
    
    // if (!images.initialPoint) {
    //   alert("Please upload the initial point image");
    //   return;
    // }
    
    if (!images.finalPoint) {
      alert("Please upload the final point image");
      return;
    }

    console.log("All images uploaded successfully!");
    window.location.reload();
  };

  return (
    <div className="App">
      <div className='top-green-btn'>
            <button onClick={openModal} className='green-btn'>Click here to make Payment</button>

      </div>
    <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{ background: 'red' }}
          >
            <div className='payment-modal'>


              <button className="close-payment btn" onClick={closeModal}>close</button>

              <h2>GooglePayNUMBER👉 +91-9964215560</h2>
              <img alt="GooglePayNUMBER👉+91-9964215560" style={{ maxWidth: '30%' }} src='./image.jpg' />
            </div>
          </Modal>
      <div className="upload-boxes-parent">
        <ImageUploadBox
          bgColor="red"
          borderColor="red"
          label="Upload the object image"
          onImageUpload={(image) => handleImageUpload(image, 'objectImage')}
        />
        {/* <ImageUploadBox
          bgColor="orange"
          borderColor="orange"
          label="Upload the object's initial point"
          onImageUpload={(image) => handleImageUpload(image, 'initialPoint')}
        /> */}
        <ImageUploadBox
          bgColor="blue"
          borderColor="blue"
          label="Upload the object final point"
          onImageUpload={(image) => handleImageUpload(image, 'finalPoint')}
        />
      </div>
      <div className="statement">
        <h2>
          <span className="bg-red">-·....·..·...·---·-...·.---·.·-.-.·-·..·...·-.-.·---·--·.--.·.-..·.·-·.·.-..·-.--·---·..-·-</span>{' '}
          <span className="bg-red">..-.·.-.·---·--·-·....·..·...·.--.·---·..·-.·-{' '}
            <span>&amp;</span>
          </span>{' '}
          <span className="bg-blue">-.-.·---·--·.--.·.-..·.·-·.·.-..·-.--·..·-.·.-·-·-·....·..·...·.--.·---·..·-.·-{' '}
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