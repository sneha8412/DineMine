import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './HostProfile.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormButton from './forms/FormButton';
import { Button } from '@material-ui/core';

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
    const [experienceId, setExperienceId] = useState(); // Debug: 16
    const [experienceImagesUrls, setExperienceImagesUrls] = useState([]);
    const [userContext, setUserContext] = useState("guest");

    const [expDetailsButtonDisabled, setSaveExpDetailsButtonDisabled] = React.useState(true);
    //const [isLoading, setIsLoading] = React.useState(true);

    const BASE_URL = "http://localhost:5000";
    const classes = useStyles();
    
    const getExperienceDetails = (expId) => {
        axios.get(`${BASE_URL}/experiences/${expId}`,
        {

        }).then((response) => {

                console.log("Get Exp Details: " + response.data);
                setExpDetails(response.data);
                setExperienceId(response.data["Experience ID"]);
            },
            (error) => {
                console.log("Get Exp Details: " + error);
            }
        );
    };

    useEffect(() => {
        console.log("useEffect experience details");

        setUserContext(location?.state?.userContext ?? "guest");

        if (location?.state?.experienceId)
        {
            setExperienceId(location?.state?.experienceId);

            loadExperiencePhotos(location?.state?.experienceId);

            getExperienceDetails(location?.state?.experienceId);
        }

    }, [location?.state?.experienceId, location?.state?.userContext]);

    const saveExpDetailChanges = (e) => {
        
        e.preventDefault();

        axios.put(
            `${BASE_URL}/experiences/${experienceId}`, 
            expDetails
        ).then((response) => {

                console.log("Put Exp Details: " + response.data);
                setExpDetails(response.data);
                setSaveExpDetailsButtonDisabled(true);
            },
            (error) => {
                console.log("Put Exp Details: " + error);
            }
        );

    }

    const handleTitleChange = (e) => {

        let expInfo = expDetails;
        expInfo["Title"] = e.target.value;
        setExpDetails(expInfo);
        setSaveExpDetailsButtonDisabled(false);
    };

    const loadExperiencePhotos = (expId) => {
            // get experience images and extract ids
            axios.get(`${BASE_URL}/images/experience/${expId}`)
                
                .then((response) => {
        
                    console.log(response.data, '!');
                    const expImages = response.data;
                    console.log("Experience Images: " + expImages);
                    
                    let expImageUrls = [];
        
                    for(let i=0; i < expImages.length; i++){
                        const expImg = expImages[i];
                        const imgId = expImg["id"];
                        expImageUrls.push(`${BASE_URL}/images/${imgId}`);
                    }
        
                    if (expImageUrls.length != experienceImagesUrls.length)
                    {
                        setExperienceImagesUrls(expImageUrls);
                    }
        
                    console.log("Experience image urls: " + experienceImagesUrls);
        
                }, 
                (error) => {
                    console.log(error);
                });
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

    const showExperiencePhotos = () => {

        return experienceImagesUrls.map((imgUrl) => {

            let imgHash = Date.now();
            const hashedImgUrl = `${imgUrl}?${imgHash}`;

            return (
                <img key={hashedImgUrl} className="image-size" src={hashedImgUrl} alt="experience-image"/>
            )
        });
    }

    const showExpDetailSaveButton = () => {
        return (
            <div>
                <FormButton
                type="submit"
                text="Save Changes"
                disabled={expDetailsButtonDisabled} 
                onClick={saveExpDetailChanges}/>
            </div>);
    };

    const showExperienceDetails = () => {
        return(
        <div>
          <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-read-only-input"
            label="Title"
            defaultValue={expDetails["Title"]}
            onChange={handleTitleChange}
            InputProps={{
                readOnly: (userContext === "guest"),
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Price"
            defaultValue={expDetails["Price"]}
            InputProps={{
                readOnly: (userContext === "guest"),
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Dine Time"
            defaultValue={expDetails["Dine time"]}
            InputProps={{
                readOnly: (userContext === "guest"),
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Cuisine"
            defaultValue={expDetails["Cuisine"]}
            InputProps={{
                readOnly: (userContext === "guest"),
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Details"
            defaultValue={expDetails["Description"]}
            InputProps={{
                readOnly: (userContext === "guest"),
                }}
          /> <br />
            {userContext === "host" && showExpDetailSaveButton()}
          </form>
        </div>
        );
    };

    return (
        <div>
            <div>
                {expDetails && showExperienceDetails()}   
            </div>
            <div>
                {experienceImagesUrls && experienceImagesUrls.length > 0 && showExperiencePhotos()}
            </div>
            <div className="add_to_cart_button">
                {userContext === "guest" && showAddToCart()}
            </div>
        </div>
    );
};

export default ExperienceDetails;