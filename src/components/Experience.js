import React, { useState } from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ImageUpload from './ImageUpload';
import './Experience.css';
import ExperienceDetails from './ExperienceDetails';
import { useLocation } from 'react-router-dom';
import ExperienceForm from './forms/ExperienceForm';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const BASE_URL = "http://localhost:5000/images/host/<host_id>"

const Experience = (props) => {

    const history = useHistory();
    const location = useLocation();

    console.log("experienceImageUploadUrl: " + location.state.experienceImageUploadUrl); 

    console.log("experience-image-download-url " + `${BASE_URL}/${location.state.experienceId}`);

    const experienceImageUrl = `${BASE_URL}/${location.state.experienceId}`;

    return (
        <Paper className="ewExperience__formDisplay">
            <div className="list__NewExperience">
                <h1> List a new Experience</h1>
                <ExperienceForm />
            </div>
            <div className="Experience__Details">
                <h1>Experience</h1>
                <ExperienceDetails experienceId={location.state.experienceId} />
            </div>

            <div className="Experience__PhotoUpload">
                <h1>Update Experience Image</h1>
                <ImageUpload imageUploadUrl={location.state.experienceImageUploadUrl}/>
                <img className="experience-image-size" src={experienceImageUrl} />
            </div>

            <div className="your__experiences">
                <h1>Add to Cart</h1>
            </div>

        </Paper>
    )
}
export default Experience;