import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import './SearchForm.css'

const SearchForm = (props) => {
  
    const [searchLocation, setSearchLocation] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [guestNumber, setGuestNumber] = useState('');
    const [searchCuisine, setSearchCuisine] = useState('');
    const [searchDinetime, setSearchDinetime] = useState('');
    
    
    const BASE_URL = "https://localhost:5000";

    const onSearchLocationChange = (event) => {
        setSearchLocation(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onSearchDateChange = (event) => {
        setSearchDate(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onGuestNumberChange = (event) => {
        setGuestNumber(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onSearchCuisineChange = (event) => {
        setSearchCuisine(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onSearchDinetimeChange = (event) => {
        setSearchDinetime(event.target.value);
    }

    // Handling Form Submissions - event handler
    const onFormSubmit = (event) => {
        // Prevent the browser submitting form and reloading the page
        event.preventDefault();
        // POST 'localhost:3000'
        if (searchLocation !== '' && searchDate !== '' && guestNumber
        !== '' && searchCuisine !== '' && searchDinetime !== '') {
            props.onSubmitCallback(searchLocation, searchDate, guestNumber, searchCuisine, searchDinetime );
        }

        setSearchLocation('');
        setSearchDate('');
        setGuestNumber('');
        setSearchCuisine('');
        setSearchDinetime('');
    };

    return (
    <form class="new-search-form" onSubmit={onFormSubmit} >
        <label>Location</label>
        <input  type="text" class="invalid-form-input" name="location-input" id="location-input" value={searchLocation} onChange={onSearchLocationChange} />
        <label>Date</label>
        <input  type="text" class="invalid-form-input" name="date-input" id="date-input" value={searchDate} onChange={onSearchDateChange} />
        <label>Guests</label>
        <input  name="guest-number-input" id="guest-number-input" value={guestNumber} onChange={onGuestNumberChange} />
        <label>Cuisine </label>
        <input  name="search-cuisine-input" id="search-cuisine-input" value={searchCuisine} onChange={onSearchCuisineChange} />
        <label>Dine time</label>
        <input  name="search-dinetime-input" id="search-dinetime-input" value={searchDinetime} onChange={onSearchDinetimeChange} />
        {/*<button>Submit</button>*/}
        {/*<input type="submit" />*/}
        <button  className= "submitButton" onClick={onFormSubmit}>Search</button>
        
    </form>

    )
};

export default SearchForm;