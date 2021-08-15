import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { Button } from "@material-ui/core";
import SearchResult from "./SearchResult";
import './SearchResultsList.css';
import config from '../config.json';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const SearchResultsList = () => {
    
    const history = useHistory();
    const location = useLocation();

    const [allExperiences, setAllExperiences] = React.useState([]);
    const [priceSortOrder, setPriceSortOrder] = React.useState("asc");
    const [cuisineFilter, setCuisineFilter] = React.useState('');
    const [numOfExperiences, setNumOfExperiences] = React.useState(0);

    const [expWithImageIds, setExpWithImageIds] = React.useState([]);

    const BASE_URL = config.SERVER_URL;  

    const getAllExperiencesWithImagesIds = (exp_uri) => {
        axios.get(exp_uri,
            {
    
            }).then((response) => {
    
                    console.log("Get All Experiences with images: " + response?.data);
                    setAllExperiences(response?.data);
    
                    setNumOfExperiences(response?.data?.length);

                    setExpWithImageIds(response?.data);
                },
                (error) => {
                    console.log("Get Host Experiences: " + error);
                }
            );
    }

    const generateRandomRating = () => {
        const randomRating = Math.random() * 5;
        const roundedRandomRating = Math.round(randomRating * 100) / 100;
        return roundedRandomRating;
    };

    const renderExperienceCards = () => {

        return expWithImageIds?.map((exp) => {
            const expId = exp["Experience ID"];
            let imgHash = Date.now();
            let imgUrl = ""
            if (exp.ImageId !== "")
            {
                imgUrl = `${BASE_URL}/images/${exp.ImageId}?${imgHash}`; //imagesForAllExperiences.get(expId);
            }
            console.log(`render image url for ${expId}: " + ${imgUrl}`);
            return (
                <div>
                    <SearchResult
                        key={expId}
                        img={imgUrl}
                        location={exp["City"]}
                        title={exp["Title"]}
                        description={exp["Description"]}
                        star={generateRandomRating()}
                        price={exp["Price"]}
                        cuisine={exp["Cuisine"]}
                        dinetime={exp["Dine time"]}
                        itemId={expId}
                        guests={exp["Total number of guests"]}
                        context="guest" 
                        />
                </div>
            );
        });        
    };

    useEffect(() => {
        
        console.log("GetAllExperienceList useEffect");

        let experienceSearchUrl = `${BASE_URL}/experiences`;
        const expSearchUrl = location?.state?.searchUrl;
        console.log("expSearchUrl: " + expSearchUrl);

        if (expSearchUrl && expSearchUrl.length > 0)
        {
            experienceSearchUrl = expSearchUrl;
        }

        //getAllExperiences(searchurl);
        getAllExperiencesWithImagesIds(experienceSearchUrl);

    }, [location?.state]);

    const handlePriceSortClick = () => {

        getAllExperiencesWithImagesIds(`${BASE_URL}/experiences?sort=${priceSortOrder}`);
        
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
        getAllExperiencesWithImagesIds(`${BASE_URL}/experiences?cuisine=${cuisineFilter}`);

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

    const handleDineTimeSelect = (selectedDinetime) => {
        getAllExperiencesWithImagesIds(`${BASE_URL}/experiences?dinetime=${selectedDinetime}`);
    }

    const handleCuisineSelect = (selectedCuisine) => {
        getAllExperiencesWithImagesIds(`${BASE_URL}/experiences?cuisine=${selectedCuisine}`);
    }

    return (
        <div className='searchPage'>
            <div className='searchPage__info'>
                <p>{numOfExperiences} DineMines found </p>
                <h1>DineMines nearby</h1>
                <Button variant="outlined">Cancellation Flexibility</Button>
                <Button variant="outlined">
                    <DropdownButton id="dropdown-item-button" title="Cuisine">
                        {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
                        <Dropdown.Item as="button" onClick={() => handleCuisineSelect("American")}>American</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleCuisineSelect("Indian")}>Indian</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleCuisineSelect("Italian")}>Italian</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleCuisineSelect("Mexican")}>Mexican</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleCuisineSelect("Thai")}>Thai</Dropdown.Item>
                    </DropdownButton>
                </Button>
                <Button variant="outlined">
                    <DropdownButton id="dropdown-item-button" title="Dine Times">
                        <Dropdown.Item as="button" onClick={() => handleDineTimeSelect("Breakfast")}>Breakfast</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleDineTimeSelect("Brunch")}>Brunch</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleDineTimeSelect("Lunch")}>Lunch</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleDineTimeSelect("Dinner")}>Dinner</Dropdown.Item>
                    </DropdownButton>
                </Button>
                <Button variant="outlined" onClick={handlePriceSortClick}>Sort by Price</Button>
                <Button variant="outlined" onClick={handleSimpleMapClick}>View on Map</Button>
            </div>

            <div>
                {renderExperienceCards()}
            </div>
        </div>
    )
  };

  export default SearchResultsList;