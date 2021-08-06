
import React, { useState } from 'react';
import SimpleMap from '../components/SimpleMap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const ImageUpload = (props) => {

  const [imageFile, setImageFile] = useState({});

  //const imageUploadUrl = props.imageUploadUrl; //`http://localhost:5000/images/host/${props.host_id}/upload`;
  
  const handleImageUpload = (e) => {
    e.preventDefault();
    console.log("imageupload component form submit" + e);

    let formData = new FormData();
    formData.append("pic", imageFile);

    console.log("formData = " + formData);

    axios.post(props.imageUploadUrl, formData, {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    })        
    .then((response) => {

        console.log(response.data, '!');
        const img_id = response.data["img_id"];
        console.log("image_id uploaded: " + img_id);

    }, 
    (error) => {
        console.log(error);
    });

  };

  const handlePickFile = (e) => {
    console.log("handlePickFile" + e.target.value);

    if (e.target.value)
    {
      setImageFile(e.target.files[0]);
    }
  };


  return (
    <div>
        <form onSubmit={handleImageUpload} enctype="multipart/form-data" method="POST"> 
        <input type="file" name="pic" onChange={handlePickFile} />
        <input type="submit" value="Upload a file"/>
        </form>
    </div>
  );
};

export default ImageUpload;