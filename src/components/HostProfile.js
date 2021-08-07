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


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const BASE_URL = "http://localhost:5000"

const HostProfile = (props) => {

    const history = useHistory();
    const location = useLocation();

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

    return (
        <div>
        {/* <Paper elevation={5} className="ewHost__formDisplay"> */}
            <div className="Host__Details">
                <h1>Host Profile</h1>
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
            {/* <Experience /> */}
        {/* </Paper> */}
        </div>
    )
}
export default HostProfile;