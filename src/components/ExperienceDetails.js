import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './HostProfile.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormButton from './forms/FormButton';
import { Button } from '@material-ui/core';
import config from '../config.json';
import ImageUpload from './ImageUpload';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function ExperienceDetails(props) {

    const history = useHistory();
    const location = useLocation();

    const [expDetails, setExpDetails] = React.useState();
    const [experienceId, setExperienceId] = useState(); 
    const [userContext, setUserContext] = useState({});

    const [expDetailsButtonDisabled, setSaveExpDetailsButtonDisabled] = React.useState(true);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [numGuests, setNumGuests] = useState();
    const [price, setPrice] = useState();
    const [cuisine, setCuisine] = useState();
    const [dineTime, setDineTime] = useState();
    const [city, setCity] = useState();

    const BASE_URL = config.SERVER_URL;
    const classes = useStyles();
    
    const getExperienceDetails = (expId) => {
        axios.get(`${BASE_URL}/experiences/${expId}`).then((response) => {

                console.log("Get Exp Details: " + response?.data);
                const exp = response?.data; 

                setTitle(exp["Title"]);


                setExpDetails(response?.data);
                setExperienceId(response?.data["Experience ID"]);
            },
            (error) => {
                console.log("Get Exp Details: " + error);
            }
        );
    };

    useEffect(() => {
        console.log("useEffect experience details");

        // setUserContext(location?.state?.userContext);

        if (location?.state?.experienceId)
        {
            getExperienceDetails(location?.state?.experienceId);
        }

        setUserContext(location?.state?.userContext);

    }, [location?.state]);

    const saveExpDetailChanges = (e) => {
        
        e.preventDefault();

        const updatedExperienceDetails = {
            "Title": title,
            "Price": price,
            "Description": description,
            "Cuisine": cuisine,
            "Total number of guests": numGuests,
            "Dine time": dineTime,
            "City": city
        };

        axios.put(
            `${BASE_URL}/experiences/${experienceId}`, 
            updatedExperienceDetails
        ).then((response) => {

                console.log("Put Exp Details: " + response.data);
                getExperienceDetails();
                //setExpDetails(response.data);
                setSaveExpDetailsButtonDisabled(true);
            },
            (error) => {
                console.log("Put Exp Details: " + error);
            }
        );

    }

    const handleChange = (e, fieldName) => {

        switch(fieldName){
            case 'Title':
                setTitle(e.target.value);
                break;
            case 'Description':
                setDescription(e.target.value);
                break;
            case 'Price':
                setPrice(parseFloat(e.target.value));
                break;
            case 'City':
                setCity(e.target.value);
                break;
            case 'Cuisine':
                setCuisine(e.target.value);
                break;
            case 'DineTime':
                setDineTime(e.target.value);
                break;
            case 'NumGuests':
                setNumGuests(e.target.value);
                break;
        };

        setSaveExpDetailsButtonDisabled(false);
    };

    const onAddToCartClicked = () => {
        console.log("Add to cart clicked")
        history.push("/checkout");
    };

    const showAddToCart = () => {

        return (
            <div className="add_to_cart_button">
                <Button size="large" className={classes.margin} onClick={onAddToCartClicked}>
                    Add To My Cart
                </Button>
            </div>
        );
    };

    const getExperienceImageUrls = () => {

        let imageIds = (expDetails && expDetails["ImageIds"]) ?? [];
        let imageUrls = []
        if (imageIds.length > 0)
        {
            imageIds.map((imgId) => {
                imageUrls.push(`${BASE_URL}/images/${imgId}`);
            });
        }

        return imageUrls;
    };

    const refreshImageUrlsOnNewImageUpload = ( ) => {
        getExperienceDetails(experienceId);
    };
    
    const showExperiencePhotos = () => {

        if (userContext.type === "guest")
        {
            return getExperienceImageUrls().map((imgUrl) => {

                let imgHash = Date.now();
                const hashedImgUrl = `${imgUrl}?${imgHash}`;

                return (
                    <img key={hashedImgUrl} className="image-size" src={hashedImgUrl} alt=""/>
                )
            });
        }
        else
        {
            return(
                <ImageUpload imageUploadUrl={`${BASE_URL}/images/experience/${experienceId}/upload`} getImageUrls={getExperienceImageUrls} refreshImageUrls={refreshImageUrlsOnNewImageUpload}/>
            );
        }
    };

    const showExpDetailSaveButton = () => {
        
        if (userContext.type === "host")
        {
        
            return (
                <div>
                    <FormButton
                    type="submit"
                    text="Save Changes"
                    disabled={expDetailsButtonDisabled} 
                    onClick={saveExpDetailChanges}/>
                </div>);
            }

        return (<div/>);
    };

    const showExperienceDetails = () => {
        return(
        <div>
        <form className={classes.root} noValidate autoComplete="off">
        <div>
              <TextField
                  id="standard-read-only-input"
                  label="Title"
                  defaultValue={expDetails["Title"]}
                  onChange={(e) => handleChange(e, "Title")}
                  InputProps={{
                      readOnly: false //(userContext.type === "guest"),
                      }}
              />
              <br />
              <TextField
                  id="standard-read-only-input"
                  label="Price"
                  defaultValue="hello"
                  onChange={(e) => handleChange(e, "Price")}
                  InputProps={{
                      readOnly: userContext.type === "guest",
                      }}
              />
              <br />
              <TextField
                  id="standard-read-only-input"
                  label="Dine Time"
                  defaultValue={expDetails["Dine time"]}
                  onChange={(e) => handleChange(e, "Dine time")}
                  InputProps={{
                      readOnly: (userContext.type === "guest"),
                      }}
              />
              <br />
              <TextField
                  id="standard-read-only-input"
                  label="Cuisine"
                  defaultValue={expDetails["Cuisine"]}
                  onChange={(e) => handleChange(e, "Cuisine")}
                  InputProps={{
                      readOnly: (userContext.type === "guest"),
                      }}
              />
              <br />
              <TextField
                  id="standard-read-only-input"
                  label="Details"
                  defaultValue={expDetails["Description"]}
                  onChange={(e) => handleChange(e, "Description")}
                  InputProps={{
                      readOnly: (userContext.type === "guest"),
                      }}
              /> <br />

                  <TextField
                  id="standard-read-only-input"
                  label="City"
                  defaultValue={expDetails["City"]}
                  onChange={(e) => handleChange(e, "city")}
                  InputProps={{
                      readOnly: (userContext.type === "guest"),
                      }}
              /> <br />

                  <TextField
                  id="standard-read-only-input"
                  label="Total number of guests"
                  defaultValue={expDetails["Total number of guests"]}
                  onChange={(e) => handleChange(e, "Total number of guests")}
                  InputProps={{
                      readOnly: (userContext.type === "guest"),
                      }}
              /> <br />

                  {showExpDetailSaveButton()}
                  </div>
              </form>
        </div>); 
    };

    return (
        <div>
            <div>
                {expDetails && showExperienceDetails()} 
            </div>  
            <div>
                {showExperiencePhotos()}
            </div>
            <div className="add_to_cart_button">
                {userContext.type === "guest" && showAddToCart()}
            </div>
        </div>
    );
};

export default ExperienceDetails;