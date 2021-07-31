import React from "react";
import SimpleMap from '../components/SimpleMap';
import { useLocation } from "react-router-dom";
import SearchResultsList from "../components/SearchResultsList";


const SearchResultsPage = (props) => {

  const location = useLocation();

  console.log(location.state.query_url); 

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <SearchResultsList />
      <SimpleMap center={{"lat": 47.530102, "lng": -122.032616}} 
                locations={[ {"lat": 47.6062, "lng": -122.3321}, {"lat": 47.5301, "lng": -122.0326} ]} />
    </div>
  );
};

export default SearchResultsPage;