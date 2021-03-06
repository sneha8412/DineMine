import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './HostProfile.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormButton from './forms/FormButton';
import config from '../config.json';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function HostDetails(props) {

    const history = useHistory();
    const location = useLocation();

    const [hostDetails, setHostDetails] = React.useState();

    const [saveHostDetailsButtonDisabled, setSaveHostDetailsButtonDisabled] = React.useState(true);
    //const [isLoading, setIsLoading] = React.useState(true);

    const BASE_URL = config.SERVER_URL; //config.SERVER_URL;
    const classes = useStyles();
    
    const getHostDetails = () => {
        axios.get(`${BASE_URL}/hosts/${props.hostId}`,
        {

        }).then((response) => {

                console.log("Get Host Details: " + response.data);
                setHostDetails(response.data);
                //setIsLoading(false);
            },
            (error) => {
                console.log("Get Host Details: " + error);
            }
        );
    };

    useEffect(() => {
        console.log("useEffect host details");

        if (props.hostId)
        {
            getHostDetails();
        }

    }, [props.hostId]);

    const saveHostDetailChanges = (e) => {
        
        e.preventDefault();

        axios.put(
            `${BASE_URL}/hosts/${props.hostId}`, 
            hostDetails
        ).then((response) => {

                console.log("Put Host Details: " + response.data);
                setHostDetails(response.data);
                setSaveHostDetailsButtonDisabled(true);
            },
            (error) => {
                console.log("Put Host Details: " + error);
            }
        );

    }

    const handleFieldChange = (fieldName, e) => {

        let hostInfo = hostDetails;
        hostInfo[fieldName] = e.target.value;
        setHostDetails(hostInfo);
        setSaveHostDetailsButtonDisabled(false);
    };


    const showHostDetails = () => {
        return(
        <div>
          <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-read-only-input"
            label="Name"
            defaultValue={hostDetails["name"]}
            onChange={(e) => handleFieldChange("name", e)}
            InputProps={{
                readOnly: false,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Introduction"
            defaultValue={hostDetails["intro"]}
            onChange={(e) => handleFieldChange("intro", e)}
            InputProps={{
                readOnly: false,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Email"
            defaultValue={hostDetails["email"]}
            onChange={(e) => handleFieldChange("email", e)}
            InputProps={{
                readOnly: true,
                }}
          />
          <TextField
            id="standard-read-only-input"
            label="Phone"
            defaultValue={hostDetails["phone"]}
            onChange={(e) => handleFieldChange("phone", e)}
            InputProps={{
                readOnly: false,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Address"
            defaultValue={hostDetails["address"]}
            onChange={(e) => handleFieldChange("address", e)}
            InputProps={{
                readOnly: false,
                }}
          />
          <TextField
            id="standard-read-only-input"
            label="City"
            defaultValue={hostDetails["city"]}
            onChange={(e) => handleFieldChange("city", e)}
            InputProps={{
                readOnly: false,
                }}
          />
          <br />
        <FormButton
            type="submit"
            text="Save Changes"
            disabled={saveHostDetailsButtonDisabled} 
            onClick={saveHostDetailChanges}/>
          </form>
        </div>);
    };

    return (

        <div>
            {hostDetails && showHostDetails()}   
        </div>
    );
};

export default HostDetails;