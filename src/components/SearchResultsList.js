import React, { useState, useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom'
import SearchResultsPage from '../pages/SearchResults';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import ExperienceDetails from './ExperienceDetails';
import { Button } from "@material-ui/core";
import SearchResult from "./SearchResult";
import './SearchResultsList.css';

const SearchResultsList = () => {
    
    const history = useHistory();
    const location = useLocation();

    const [allExperiences, setAllExperiences] = React.useState([]);
    const [imagesForAllExperiences, setImagesForAllExperiences] = React.useState(new Map());

    const BASE_URL = "http://localhost:5000";

    const nextPageEventHandler = event => {
        history.push({
            pathname: '/experience',
            //search: '?query=abc',
            state: { query_url: "http://localhost:5000/experiences?id=123" }
        });
     };   

    const getAllExperiences = () => {
        axios.get(`${BASE_URL}/experiences`,
        {

        }).then((response) => {

                console.log("Get All Experiences: " + response?.data);
                setAllExperiences(response?.data);

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

                    imagesForAllExperiences.set(exp_id, expImageUrl);
                    setImagesForAllExperiences(imagesForAllExperiences);

                    console.log(`Setting image url for expId ${exp_id} to: ${imagesForAllExperiences.get(exp_id)}`);
                }
            },
            (error) => {
                console.log("Get Experience images: " + error);
            }
        );
    };

    const renderExperienceCards = () => {

        return allExperiences.map((exp) => {
            const expId = exp["Experience ID"];
            let imgHash = Date.now();
            const imgUrl = imagesForAllExperiences.get(expId);
            let hashImgUrl = "";
            if (imgUrl){
                hashImgUrl = `${imgUrl}?${imgHash}`;
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
                        star={4.73}
                        price={exp["Price"]}
                        cuisine={exp["Cuisine"]}
                        dinetime={exp["Dine time"]}
                        itemId={expId}
                        context="guest" 
                        />
                </div>
            );
        });        
    };

    useEffect(() => {
        
        console.log("GetAllExperienceList useEffect");

        getAllExperiences();

    }, []);

    return (
        <div className='searchPage'>
            <div className='searchPage__info'>
                <p>62 DineMines · 26 august · 2 guest</p>
                <h1>DineMines nearby</h1>
                <Button variant="outlined">Cancellation Flexibility</Button>
                <Button variant="outlined">Type of Cusine</Button>
                <Button variant="outlined">Price</Button>
                <Button variant="outlined">Dine Times</Button>
                <Button variant="outlined">Location</Button>
                <Button variant="outlined">View on Map</Button>
            </div>

            <div>
                {allExperiences && allExperiences.length > 0 && renderExperienceCards()}
            </div>
        </div>
    )
  };

  export default SearchResultsList;