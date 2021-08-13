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

    const handleNameChange = (e) => {

        let hostInfo = hostDetails;
        hostInfo["name"] = e.target.value;
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
            onChange={handleNameChange}
            InputProps={{
                readOnly: false,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Introduction"
            defaultValue={hostDetails["intro"]}
            InputProps={{
                readOnly: true,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Email"
            defaultValue={hostDetails["email"]}
            InputProps={{
                readOnly: true,
                }}
          />
          <TextField
            id="standard-read-only-input"
            label="Phone"
            defaultValue={hostDetails["phone"]}
            InputProps={{
                readOnly: true,
                }}
          />
          <br />
          <TextField
            id="standard-read-only-input"
            label="Address"
            defaultValue={hostDetails["address"]}
            InputProps={{
                readOnly: true,
                }}
          />
          <TextField
            id="standard-read-only-input"
            label="City"
            defaultValue={hostDetails["city"]}
            InputProps={{
                readOnly: true,
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