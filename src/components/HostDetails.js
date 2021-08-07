import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './HostProfile.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';

function HostDetails(props) {

    const history = useHistory();
    const location = useLocation();

    const [hostDetails, setHostDetails] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    const BASE_URL = "http://localhost:5000";
    
    const getHostDetails = () => {
        axios.get(`${BASE_URL}/hosts/${props.hostId}`,
        {

        }).then((response) => {

                console.log("Get Host Details: " + response.data);
                setHostDetails(response.data);
                setIsLoading(false);
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

    const showHostDetails = () => {
        return(
        <div>
            <div>Name: {hostDetails["name"]}</div>
            <br/>

            <div>Address: {hostDetails["address"]}</div>
            <br/>

            <div>City: {hostDetails["city"]}</div>
            <br/>

            <div>Email: {hostDetails["email"]}</div>
            <br/>

            <div>Introduction: {hostDetails["intro"]}</div>
            <br/>

            <div>Phone: {hostDetails["phone"]}</div>
        </div>);
    };

    return (

        <div>
            {!isLoading && hostDetails && showHostDetails()}   
        </div>
    );
};

export default HostDetails;