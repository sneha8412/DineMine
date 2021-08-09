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
    const [experienceId, setExperienceId] = useState(16); // Debug: 16
    const [hostId, setHostId] = useState("");
    const [experienceImagesUrls, setExperienceImagesUrls] = useState([]);
    const [userContext, setUserContext] = useState("guest");

    const [expDetailsButtonDisabled, setSaveExpDetailsButtonDisabled] = React.useState(true);
    //const [isLoading, setIsLoading] = React.useState(true);

    const BASE_URL = "http://localhost:5000";
    const classes = useStyles();
    
    const getExperienceDetails = () => {
        axios.get(`${BASE_URL}/experiences/${props.experienceId}`,
        {

        }).then((response) => {

                console.log("Get Exp Details: " + response.data);
                setExpDetails(response.data);
                setExperienceId(response.data["Experience ID"]);
                //setIsLoading(false);
            },
            (error) => {
                console.log("Get Exp Details: " + error);
            }
        );
    };

    useEffect(() => {
        console.log("useEffect experience details");

        if (props.experienceId)
        {
            setExperienceId(props.experienceId);
        }

        getExperienceDetails();

        if (props.userContext === "guest")
        {
            setUserContext("guest");
        }
        else
        {
            setUserContext("host");
        }

    }, [props.experienceId]);

    const saveExpDetailChanges = (e) => {
        
        e.preventDefault();

        axios.put(
            `${BASE_URL}/experiences/${props.experienceId}`, 
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

    useEffect(() => {
        loadExperiencePhotos();

        if (props.userContext === "guest")
        {

        }

    }, []);

    const loadExperiencePhotos = () => {
            // get experience images and extract ids
            axios.get(`${BASE_URL}/images/experience/${experienceId}`)
                
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
    };

    const showGuestInteractions = () => {

        return (
            <Button size="large" className={classes.margin} onClick={onAddToCartClicked}>
                Add To My Cart
            </Button>
        )

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
                readOnly: false,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Price"
            defaultValue={expDetails["Price"]}
            InputProps={{
                readOnly: true,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Dine Time"
            defaultValue={expDetails["Dine time"]}
            InputProps={{
                readOnly: true,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Cuisine"
            defaultValue={expDetails["Cuisine"]}
            InputProps={{
                readOnly: true,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Details"
            defaultValue={expDetails["Description"]}
            InputProps={{
                readOnly: true,
                }}
          /> <br />
        <FormButton
            type="submit"
            text="Save Changes"
            disabled={expDetailsButtonDisabled} 
            onClick={saveExpDetailChanges}/>
          </form>
        </div>);
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
                {userContext === "guest" && showGuestInteractions()}
            </div>
        </div>
    );
};

export default ExperienceDetails;