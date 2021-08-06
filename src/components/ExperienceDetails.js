import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './HostProfile.css';
import axios from "axios";


function ExperienceDetails(props) {

    const history = useHistory();
    const location = useLocation();

    const [experienceDetails, setExperienceDetails] = React.useState({});

    const BASE_URL = "http://localhost:5000";
    
    const getExperienceDetails = () => {
        axios.get(`${BASE_URL}/hosts/<host_id>/${props.experienceID}`, // issue with host id and experience id what should the URL be?
        {

        }).then((response) => {

                console.log("Get Experience Details: " + response.data);
                setExperienceDetails(response.data);
            },
            (error) => {
                console.log("Get Experience Details: " + error);
            }
        );
    };

    useEffect(() => {

        if (props.experienceId)
        {
            getExperienceDetails();
        }

    }, []);

    // componentDidMount() 

    return (
        <div>
            <div>Title: {experienceDetails["title"]}</div>
            <br/>
    
            <div>Address: {experienceDetails["price"]}</div>
            <br/>

            <div>Description: {experienceDetails["description"]}</div>
            <br/>

            <div>Cuisine: {experienceDetails["cuisine"]}</div>
            <br/>

            <div>Dine time: {experienceDetails["dinetime"]}</div>
            <br/>

            <div>City: {experienceDetails["city"]}</div>
        </div>
    );
};

export default ExperienceDetails;