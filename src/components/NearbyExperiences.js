import React from 'react';
import { withRouter, Route } from 'react-router-dom'
import SearchResultsPage from '../pages/SearchResults';
import { useHistory } from 'react-router-dom';
import config from '../config.json';

const BASE_URL = SERVER_URL;

const NearbyExperiences = () => {
    
    let history = useHistory();

    const nextPageEventHandler = event => {
        history.push({
            pathname: '/experience',
            //search: '?query=abc',
            state: { query_url: `${BASE_URL}/experiences?id=123` }
        });
     };

    const handleExperienceClick = () => {
        console.log('You clicked Search.');
        nextPageEventHandler();
    };    


    return (
      <div className="nearby-experiences">
          <span>Nearby Experiences component goes here</span>
          <button onClick={handleExperienceClick}>Selected Experience</button>
          {/* <SearchButton /> */}
      </div>
        
    );
  };

  export default NearbyExperiences;