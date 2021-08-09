import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './HostProfile.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import ExperienceDetails from './ExperienceDetails';
import SearchResult from './SearchResult';
import './HostExperienceList.css'

function HostExperienceList(props) {

    const history = useHistory();
    const location = useLocation();

    const [hostExperiences, setHostExperiences] = React.useState([]);
    const [imagesForHostExperiences, setImagesForHostExperiences] = React.useState(new Map());

    const BASE_URL = "http://localhost:5000";
    
    const getHostExperiences = () => {
        axios.get(`${BASE_URL}/experiences/hosts/${props.hostId}`,
        {

        }).then((response) => {

                console.log("Get Host Experiences: " + response?.data);
                setHostExperiences(response?.data);

                let hostExpImages = []

                for (let i = 0; i < response?.data?.length; i++)
                {
                    const exp = response?.data[i];
                    const exp_id = exp["Experience ID"];

                    updateMainImageUrlForExperience(exp_id);
                }
            },
            (error) => {
                console.log("Get Host Experiences: " + error);
            }
        );
    };

    const updateMainImageUrlForExperience = (exp_id) => {

        axios.get(`${BASE_URL}/images/experience/${exp_id}`).then((response) => {

                console.log("Get Experience images: " + response.data);

                const expImages = response.data;

                if (expImages && expImages.length > 0)
                {
                    const firstExpImage = expImages[0];
                    const imgId = firstExpImage["id"];
                    const expImageUrl = `${BASE_URL}/images/${imgId}`;

                    console.log("Main experience image id: " + imgId);

                    imagesForHostExperiences.set(exp_id, expImageUrl);
                    setImagesForHostExperiences(imagesForHostExperiences);

                    console.log(`Setting image url for expId ${exp_id} to: ${imagesForHostExperiences.get(exp_id)}`);
                }
            },
            (error) => {
                console.log("Get Experience images: " + error);
            }
        );
    };


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
            const expId = exp["Experience ID"];
            let imgHash = Date.now();
            const imgUrl = imagesForHostExperiences.get(expId);
            let hashImgUrl = `${imgUrl}?${imgHash}`
            if (!imgUrl){
                hashImgUrl = "";
            }
            console.log(`render image url for ${expId}: " + ${hashImgUrl}`);
            return (
                <div>
                    <SearchResult
                        key={expId}
                        img={hashImgUrl}
                        location="todo: add location"
                        title={exp["Title"]}
                        description={exp["Description"]}
                        cuisine={exp["Cuisine"]}
                        dinetime={exp["Dine time"]}
                        star={4.73}
                        price={exp["Price"]} />
                    {/* <div className="image-size">
                        <img className="image-size" key={expId} src={hashImgUrl} />
                    </div> */}
                </div>
            );
        });        
    };

    return (
        <div>
            {hostExperiences && hostExperiences.length > 0 && renderExperienceCards()}
        </div>
    );
};

export default HostExperienceList;