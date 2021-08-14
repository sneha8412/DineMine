import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { Button } from "@material-ui/core";
import SearchResult from "./SearchResult";
import './SearchResultsList.css';
import config from '../config.json';

const SearchResultsList = () => {
    
    const history = useHistory();
    const location = useLocation();

    const [allExperiences, setAllExperiences] = React.useState([]);
    const [priceSortOrder, setPriceSortOrder] = React.useState("asc");
    const [cuisineFilter, setCuisineFilter] = React.useState('');
    const [imagesForAllExperiences, setImagesForAllExperiences] = React.useState(new Map());
    const [resultsFullyLoaded, setResultsFullyLoaded] = React.useState(false);
    const [numOfExperiences, setNumOfExperiences] = React.useState(0);

    const BASE_URL = config.SERVER_URL;  

    const getAllExperiences = (exp_uri) => {
        axios.get(exp_uri,
        {

        }).then((response) => {

                console.log("Get All Experiences: " + response?.data);
                setAllExperiences(response?.data);

                setNumOfExperiences(response?.data?.length);

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

                    setResultsFullyLoaded(imagesForAllExperiences.size === allExperiences.length);

                    console.log(`Setting image url for expId ${exp_id} to: ${imagesForAllExperiences.get(exp_id)}`);
                }
            },
            (error) => {
                console.log("Get Experience images: " + error);
            }
        );
    };

    const renderExperienceCards = () => {

        return allExperiences?.map((exp) => {
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
                        location={exp["City"]}
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

        let searchurl = `${BASE_URL}/experiences`;
        const expSearchUrl = location?.state?.searchUrl;
        console.log("expSearchUrl: " + expSearchUrl);

        if (expSearchUrl && expSearchUrl.length > 0)
        {
            searchurl = expSearchUrl;
        }

        getAllExperiences(searchurl);

    }, [BASE_URL, location?.state?.searchUrl]);

    const handlePriceSortClick = () => {

        getAllExperiences(`${BASE_URL}/experiences?sort=${priceSortOrder}`);
        
        if (priceSortOrder === "asc")
        {
            setPriceSortOrder("desc");
        }
        else
        {
            setPriceSortOrder("asc");
        }
    };

    const handleCuisineFilterClick =() => {
        getAllExperiences(`${BASE_URL}/experiences?cuisine=${cuisineFilter}`);

        setCuisineFilter(cuisineFilter)
    };

    const handleSimpleMapClick =() => {
        history.push(
            {
                pathname: '/map',
                state: {
                    centerMap: {lat: 47.3073, lng: -122.2285 },
                    zoomLevel: 10,
                    mapPoints: [
                        {lat: 47.406209, lng: -122.322069 }, 
                        {lat: 47.506209, lng: -122.232069 },
                        {lat: 47.106209, lng: -122.432069 },
                        {lat: 47.206209, lng: -122.132069 }
                    ]
                }
            });
    }

    return (
        <div className='searchPage'>
            <div className='searchPage__info'>
                <p>{numOfExperiences} DineMines found </p>
                <h1>DineMines nearby</h1>
                <Button variant="outlined">Cancellation Flexibility</Button>
                <Button variant="outlined" onClick={handleCuisineFilterClick}>Type of Cusine</Button>
                <Button variant="outlined" onClick={handlePriceSortClick}>Price</Button>
                <Button variant="outlined">Dine Times</Button>
                {/* <Button variant="outlined">Location</Button> */}
                <Button variant="outlined" onClick={handleSimpleMapClick}>View on Map</Button>
            </div>

            <div>
                {numOfExperiences > 0 && resultsFullyLoaded && renderExperienceCards()}
            </div>
        </div>
    )
  };

  export default SearchResultsList;