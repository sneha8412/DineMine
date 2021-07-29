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
      <SimpleMap />
    </div>
  );
};

export default SearchResultsPage;