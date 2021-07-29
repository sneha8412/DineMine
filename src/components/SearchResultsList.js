import React from 'react';
import { withRouter, Route } from 'react-router-dom'
import SearchResultsPage from '../pages/SearchResults';
import { useHistory } from "react-router-dom";

const SearchResultsList = () => {
    
    let history = useHistory();

    const nextPageEventHandler = event => {
        history.push({
            pathname: '/experience',
            //search: '?query=abc',
            state: { query_url: "http://localhost:5000/experiences?id=123" }
        });
     };

    const handleSelectedExperienceClick = () => {
        console.log('You clicked a specific experience.');
        nextPageEventHandler();
    };    


    return (
      <div className="">
          <span>Search Results List goes here</span>
          <button onClick={handleSelectedExperienceClick}>Selected Experience</button>
      </div>
        
    );
  };

  export default SearchResultsList;