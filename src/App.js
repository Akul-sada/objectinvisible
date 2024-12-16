// import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className='upload-boxes-parent'>
        <div className='upload-box bg-red border-red'><h3>upload the object image</h3></div>
        <div className='upload-box bg-orange border-orange'><h3>upload the object initial point</h3></div>
        <div className='upload-box bg-blue border-blue'><h3>upload the object final point</h3></div>
      </div>
      <div className="">
        <h2><span className='bg-red'>THIS OBJECT IS COMPLETELY OUT</span> <span className='bg-orange'>FROM THIS  POINT  <span>&amp;</span></span> <span className='bg-blue'>COMPLETELY IN AT THIS POINT  <span>&infin;</span></span></h2>
      </div>
    </div>
  );
}

export default App;
