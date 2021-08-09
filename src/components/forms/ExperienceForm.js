import React, { useState, useEffect } from 'react';
import { FormControlLabel, Grid, Paper, makeStyles } from '@material-ui/core';
import { useForm, Form } from './UseForm';
import RadioGroup from './RadioGroup';
import Input from './Input'
import FormButton from './FormButton';
import ImageUpload from '../ImageUpload';
import './ExperienceForm.css';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { LocationOn } from '@material-ui/icons';

const initialFValues = {
    title: '',
    price: 0.0,
    description: '',
    cuisine: '',
    dinetime: '', 
    city: ''
};

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
  }));

const BASE_URL = "http://localhost:5000";

function ExperienceForm(props) {

    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const [experienceId, setExperienceId] = useState("16");
    const [hostId, setHostId] = useState("");
    const [experienceImagesUrls, setExperienceImagesUrls] = useState([]);
    const [lastShownExpImageUrls, setLastShownImageUrls] = useState([]);
    const [publishButtonDisabled, setPublishButtonDisabled] = useState(false);
    

    useEffect(() => {

        if (location?.state?.userContext && location?.state?.userContext === "host")
        {
            setHostId(`${location.state.hostId}`);
            getExperienceImageUrls();
        }

    }, []);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('title' in fieldValues)
            temp.title= fieldValues.title ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price > 0.00 ? "": "This field is required." 
        if ('description' in fieldValues)
            temp.hdescription = fieldValues.description ? "" : "This field is required."
        if ('cuisine' in fieldValues)
            temp.cuisine = fieldValues.cuisine? "" : "Cuisine is not valid." 
        if ('dinetime' in fieldValues)
            temp.dinetime = fieldValues.dinetime ? "" : "Enter one: Breakfast, Brunch, lunch, tea time, Dinner."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "You must enter the city name."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const onSaveExperienceDetails  = e => {
        e.preventDefault();
            
        if (validate()){
            // employeeService.insertEmployee(values)

            // create host json object to send to backend
            const experience = { 
                "Title": values.title,
                "Price": values.price,
                "Description": values.description,
                "Cuisine": values.cuisine,
                "Dine time": values.dinetime,
            }

            axios.post(`${BASE_URL}/experiences/hosts/${hostId}`, experience).then((response) => {

                    console.log(response.data, '!');
                    const exp_id = response.data["experience_id"];
                    setExperienceId(exp_id);

                    console.log("new experience post to server handler" + exp_id);

                    getExperienceImageUrls(exp_id);

                    setPublishButtonDisabled(false);                    
                }, 
                (error) => {
                    console.log(error);
                });
        }
    };

    const getExperienceImageUrls = () => {

        return experienceImagesUrls;
    };

    const refreshExperienceImageUrlsOnImageUpload = () => {
        updateExperienceImageUrls();
    };

    const addExperiencePhotos = () => {

        return (
            <div className="Experience__PhotoUpload">
                <h1>Add Photos</h1>
                <ImageUpload imageUploadUrl={`${BASE_URL}/images/experience/${experienceId}/upload`} getImageUrls={getExperienceImageUrls} refreshImageUrls={refreshExperienceImageUrlsOnImageUpload}/>
            </div>
        );
    };

    useEffect(() => {

        if (experienceId !== "")
        {
            updateExperienceImageUrls();
        }

    }, [experienceId]);


    const updateExperienceImageUrls = () => {

        if (experienceId === "")
        {
            return;
        }

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
    
    const onPublishExperienceHandler = () => {

        history.push({
            pathname: "/experience",
            state: { 
                experienceId: experienceId
            }
        });

    };

    return(
        <div>
        <Paper elevation={5}>
        <div>
        <Form>
          <h1 className="your__Experience" >Create Your Experience</h1>
            <Grid container className="Form__Input">
                <Grid item xs={8}>
                    <Input
                    name ="title"
                    label ="Experience Title"
                    value = {values.title}
                    onChange = {handleInputChange}
                    error = {errors.title}
                    />

                    <Input 
                    name="price"
                    label ="Price $"
                    value = {values.price}
                    error= {errors.price}
                    onChange ={handleInputChange}
                    />
                    
                    <Input
                    name="description"
                    label ="Description"
                    onChange = {handleInputChange}
                    value = {values.description}
                    error ={errors.description}
                    />

                    <Input
                    name="cuisine"
                    label ="Cuisine"
                    value = {values.cuisine}
                    onChange ={handleInputChange}
                    error ={errors.cuisine}
                    /> 

                    <Input 
                    name="dinetime"
                    label="Dine time - Enter: Breakfast, Brunch, Lunch, Tea-Time, or Dinner"
                    value={values.dinetime}
                    onChange={handleInputChange}
                    />

                    <Input 
                    name="city"
                    label ="City"
                    value = {values.city}
                    onChange ={handleInputChange}
                    error ={errors.city} 
                    />
                </Grid>

                <Grid item xs = {4}>
                    <div>
                        <FormButton
                            type="submit"
                            text="Save" 
                            onClick={onSaveExperienceDetails}/>
                        <FormButton
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid> 
            </Grid>
        </Form>
        </div>

        <div>
            {experienceId !== "" && addExperiencePhotos()}
        </div>

        <div className="Publish_Experience">
            <Button size="large" className={classes.margin} onClick={onPublishExperienceHandler} disabled={publishButtonDisabled}>
                Publish
            </Button>
        </div>
        </Paper>
        </div>
        
    )
};

export default ExperienceForm