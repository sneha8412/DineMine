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

const BASE_URL = "http://localhost:5000";

const Experience = (props) => {

    const history = useHistory();
    const location = useLocation();

    //console.log("experienceImageUploadUrl: " + location.state.experienceImageUploadUrl); 

    console.log("experience-id " + `${BASE_URL}/images/experience/${location?.state?.experienceId}`);

    const experienceImageUrl = `${BASE_URL}/images/experience/${location?.state?.experienceId}`;

    return (
        <Paper elevation={15} className="NewExperience__formDisplay">
            <div className="Experience__Details">
                <h1 className="Experience__Heading">Experience</h1>
                <ExperienceDetails experienceId={location?.state?.experienceId} />
            </div>
        </Paper>
    )
}
export default Experience;