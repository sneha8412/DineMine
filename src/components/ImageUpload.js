
import React from 'react';
import SimpleMap from '../components/SimpleMap';
import { useLocation } from 'react-router-dom';


const ImageUpload = (props) => {

  return (
    <div>
        <form action={props.upload_url} enctype="multipart/form-data" method="POST"> 
        <input type="file" name="pic" />
        <input type="submit" value="Upload a file"/>
        </form>
    </div>
  );
};

export default ImageUpload;