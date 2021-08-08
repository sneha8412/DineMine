import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './HostProfile.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import ExperienceDetails from './ExperienceDetails';
import SearchResult from './SearchResult';

function HostExperienceList(props) {

    const history = useHistory();
    const location = useLocation();

    const [hostExperiences, setHostExperiences] = React.useState();
    const [imagesForHostExperiences, setImagesForHostExperiences] = React.useState(new Map());

    const BASE_URL = "http://localhost:5000";
    
    const getHostExperiences = () => {
        axios.get(`${BASE_URL}/experiences/hosts/${props.hostId}`,
        {

        }).then((response) => {

                console.log("Get Host Experiences: " + response.data);
                setHostExperiences(response.data);

                for (let i = 0; i < hostExperiences?.length; i++)
                {
                    const exp = hostExperiences[i];
                    const exp_id = exp["Experience ID"];
                    imagesForHostExperiences.set(exp_id, `${BASE_URL}/images/experience/${exp_id}`);
                    console.log(`setting image url for expId ${exp_id} to: ${BASE_URL}/images/experience/${exp_id}`);
                    setImagesForHostExperiences(imagesForHostExperiences);
                }
            },
            (error) => {
                console.log("Get Host Experiences: " + error);
            }
        );
    };

    // const getMainImageForExperience = (exp_id) => {

    //     axios.get(`${BASE_URL}/images/experience/${exp_id}`,
    //     {

    //     }).then((response) => {

    //             console.log("Get Experience images: " + response.data);
    //             //setHostExperiences(response.data);
    //             console.log("Main experience image: " + response.data[0]);
                
    //             hostExperiences.set(exp_id, response.data[0]);

    //         },
    //         (error) => {
    //             console.log("Get Experience images: " + error);
    //         }
    //     );
    // };


    useEffect(() => {
        
        console.log("HostExperienceList useEffect");
        
        if (props.hostId)
        {
            getHostExperiences();
        }

    }, [props.hostId]);

    // componentDidMount() 
    const renderExperienceCards = () => {

        return hostExperiences.map((exp) => {
            return (
                <SearchResult
                key={exp["Experience ID"]}
                img={imagesForHostExperiences.get(exp["Experience ID"])}
                location="todo: add location"
                title={exp["Title"]}
                description={exp["Description"]}
                cuisine={exp["Cuisine"]}
                dinetime={exp["Dine time"]}
                star={4.73}
                price={exp["Price"]} />
            );
        });        
    };

    return (
        <div>
            {hostExperiences && renderExperienceCards()}
        </div>
    );
};

export default HostExperienceList;