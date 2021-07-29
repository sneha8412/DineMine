import React from 'react';
import { withRouter, Route } from 'react-router-dom'
import SearchResultsPage from '../pages/SearchResults';
import { useHistory } from "react-router-dom";

const SearchExperiences = () => {
    
    let history = useHistory();

    const nextPageEventHandler = event => {
        history.push({
            pathname: '/searchresults',
            //search: '?query=abc',
            state: { query_url: "http://localhost:5000/experiences?cusine=indian" }
        });
     };

    const handleSearch = () => {
        console.log('You clicked Search.');
        nextPageEventHandler();
    };    


    return (
      <div className="search-experiences">
          <span>Search Experiences component goes here</span>
          <button onClick={handleSearch}>Search</button>
          {/* <SearchButton /> */}
      </div>
        
    );
  };

  export default SearchExperiences;