import React, { useState, useEffect } from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ExperienceForm from './forms/ExperienceForm'
import ImageUpload from './ImageUpload';
import './HostProfile.css';
import HostDetails from './HostDetails';
import HostExperienceList from './HostExperienceList';
import Experience from './Experience';
import { useLocation } from 'react-router-dom';
import FormButton from './forms/FormButton';
import Button from '@material-ui/core/Button';
import config from '../config.json';

const BASE_URL = config.SERVER_URL;

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

const HostProfile = (props) => {

    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const [hostImageUrl, setHostImageUrl] = useState("");
    const [currentHostId, setCurrentHostId] = useState("");

    console.log("hostImageUploadUrl: " + location.state.hostImageUploadUrl); 

    console.log("host-image-download-url " + `${BASE_URL}/images/host/${location.state.hostId}`);

    //const hostImageUrl = `${BASE_URL}/${location.state.hostId}`;

    useEffect(() => {
        if (location?.state?.hostId){
            setCurrentHostId(`${location.state.hostId}`);
            setHostImageUrl(`${BASE_URL}/images/host/${location.state.hostId}`);
        }
    }, [location.state.hostId]);

    const getHostImageUrls = () => {
        //const hostImg = `${BASE_URL}/${location.state.hostId}`;
        console.log("getHostImages called: " + hostImageUrl);
        return [hostImageUrl];
    };

    const handleCreateNewExperience = () => {
        
        history.push({
            pathname: "/newexperience",
            state: { 
                userContext: "host",
                hostId: currentHostId
            }
        });
    };

    return (
        <div>
        <Paper elevation={5} className="NewHost__formDisplay">
            <div className="Host__Details">
                <h1 className="Host__Profile">Host Profile</h1>
                <HostDetails hostId={currentHostId} />
            </div>

            <div className="Host__PhotoUpload">
                <h1>Upload Host Profile Image</h1>
                <ImageUpload imageUploadUrl={location.state.hostImageUploadUrl} getImageUrls={getHostImageUrls}/>
            </div>

            <div className="your__experiences">
                <h1>Your Experiences</h1>
                <HostExperienceList hostId={currentHostId} />
            </div>
            <div className="createNewExperienceButton">
                <Button size="large" className={classes.margin} onClick={handleCreateNewExperience}>
                    Create New Experience
                </Button>
            </div>
        </Paper>
        </div>
    )
}
export default HostProfile;