// import logo from './logo.svg';
import './App.css';
import ImageUploadBox from './ImageUploadBoxInitial';


function App() {
  // add photo upload functionality
  // 1) take permission of the camera device
  const onSubmit =()=>{
    window.location.reload() ;
  }
  return (
    <div className="App">
      <div className='upload-boxes-parent'>
        <ImageUploadBox bgColor="red" borderColor="red" label="upload the object image"/>
        <ImageUploadBox bgColor="orange" borderColor="orange" label="upload the object's initial point"/>
        {/* <ImageUploadBox bgColor="yellow" borderColor="yellow" label="upload the object image"/> */}
        <ImageUploadBox bgColor="blue" borderColor="blue" label="upload the object final point"/>
      </div>
      <div className="statement">
        <h2><span className='bg-red'>THIS OBJECT IS COMPLETELY OUT</span> <span className='bg-orange'>FROM THIS  POINT  <span>&amp;</span></span> <span className='bg-blue'>COMPLETELY IN AT THIS POINT  <span style={{fontSize:'9rem'}}>&infin;</span></span></h2>
      </div>
      <div>
          <input onClick={onSubmit} type="submit" className='button-71' value="Submit"/>
      </div>
    </div>
  );
}

export default App;
