
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageUpload.css';


const ImageUpload = (props) => {

  const [imageFile, setImageFile] = useState({});
  const [, setUploadedImageId] = useState("");
  const [imageDownloadUrls, setImageDownloadUrls] = useState([]);
  const [imageCssClass, setImageCssClass] = useState("image-size");

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
        setUploadedImageId(img_id);

        // Fire function on upload of new image 
        if (props.refreshImageUrls)
        {
          props.refreshImageUrls();
        }

        // Get the refreshed image urls
        if (props.getImageUrls)
        {
          const imageUrls = props.getImageUrls();
          setImageDownloadUrls(imageUrls);
        }
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

  useEffect(() => {
    if (props?.getImageUrls)
    {
      const imageUrls = props.getImageUrls();
      setImageDownloadUrls(imageUrls);
    }

    if (props?.imageCssClass)
    {
      setImageCssClass(props.imageCssClass);
    }

  }, [props]);

  // useEffect(() => {
  //   if (props.imageDownloadUrls)
  //   {
  //     const imageUrls = props.imageDownloadUrls;
  //     setImageDownloadUrls(imageUrls);
  //   }
  // }, [props.imageDownloadUrls]);

  const renderImages = () => {
    if (imageDownloadUrls)
    {
      return imageDownloadUrls.map((imgUrl) => {
        let imgHash = Date.now();
        let imgLink = `${imgUrl}?${imgHash}`;
        return (<img key={imgLink} className={imageCssClass} src={imgLink} alt="" />);
      });
    }
    else
    {
      <div />
    }
  }

  return (
    <div>
        <form onSubmit={handleImageUpload} encType="multipart/form-data" method="POST"> 
        <input type="file" name="pic" onChange={handlePickFile} />
        <input type="submit" value="Upload a file"/>
        </form>
        <div>
          {renderImages()}
        </div>
    </div>
  );
};

export default ImageUpload;