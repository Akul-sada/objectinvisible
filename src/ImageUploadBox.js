import React, {useState, useRef} from 'react';
import './App.css';


const ImageUploadBox =({bgColor,borderColor,label})=>{
    const [image, setImage]= useState(null);
    const [error, setError]= useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event)=>{
        const file = event.target.files[0];

        // Image Validation
        if(file){
            const validTypes = ["image/jpeg","image/png","image/gif"];
            if(!validTypes.includes(file.type)){
                setError("Invalid file type. Please upload an Image.");
                return;
            }
            // Check file size (e.g., max 12 MB)
            const maxSize = 12*1024*1024;
            if(file.size > maxSize){
                setError("File is too large. Maximum size allowed is 12MB.");
                return;
            }

            // Read and set Image
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImage(reader.result);
                setError(null);
            }
            reader.readAsDataURL(file);

        }
    }
    const handleClick = ()=>{
        fileInputRef.current.click();
    }
    return(
        <>
            <div className={`upload-box bg-${bgColor} border-${borderColor}`} onClick={handleClick}>
                <input type='file' ref={fileInputRef} onChange={handleImageUpload} accept="image/jpeg,image/png,image/gif" style={{display:'none'}}/>
                {error && <div className='error-message'>{error}</div>}
                {!image ? (<div className='upload-text'>{label}</div>):(<img style={{objectFit:'cover',width:'100%',height:'100%'}} src={image} alt="uploaded-image"/>)}
            </div>
        </>
    );

}

export default ImageUploadBox;