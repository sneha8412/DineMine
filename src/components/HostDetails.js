import React, { useState, useEffect } from 'react';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';
import HostForm from './forms/HostForm';
import Experience from './Experience';
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router,Route,Switch,Link,Redirect} from "react-router-dom";
//parent component for hostform
import ExperienceForm from './forms/ExperienceForm'
import ImageUpload from './ImageUpload';
import './HostProfile.css';
import axios from "axios";
import TextField from '@material-ui/core/TextField';

import { useLocation } from 'react-router-dom';


const BASE_URL = "http://localhost:5000/images/host";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const HostDetails = (props) => {

    const history = useHistory();
    const location = useLocation();

    const [hostDetails, setHostDetails] = useState();

    //setHostImageDownloadUrl(`${BASE_URL}/${location.state.hostImageUploadUrl}`);
    const BASE_URL = "http://localhost:5000";
    
    useEffect(() => {

        axios.get(`${BASE_URL}/hosts/${props.hostId}`,
        {

        }).then((response) => {

            setHostDetails(response.data);
        });

    });



    return (
        <div>
            <TextField
            id="standard-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
                readOnly: true,
            }}
            />
        </div>
    )
}
export default HostDetails;