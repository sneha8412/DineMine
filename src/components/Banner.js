import React, { useState } from 'react'
import './Banner.css'
import { Button } from "@material-ui/core";
import Search from './Search';
import { useHistory } from "react-router-dom";
import config from '../config.json';

const BASE_URL = config.SERVER_URL;

function Banner() {
    const history = useHistory();
    const [showSearch, setShowSearch] = useState(false);

    const handleSearchButtonClick = () => {
        history.push(
            {
            pathname: '/search',
            state: 
                {
                    searchUrl: `${BASE_URL}/experiences?sort=asc`
                }
            });
    };

    return (
        <div className='banner'>
            <div className='banner__search'>
                {showSearch && <Search />}

                <Button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search Dates"}
                </Button>
            </div>
            <div className='banner__info'>
                <h1>Explore authentic local home-diners</h1>
                <h5>
                Choose from a variety of Cuisines and dining experiences
                </h5>
                <Button onClick={handleSearchButtonClick} variant='outlined'>Dine Nearby</Button>
            </div>
        </div>
    )
}

export default Banner