/*index.jsx*/
import React from "react";
import SearchExperiences from "../components/SearchExperiences";
//You have to use the link component to link between pages using react router
import { Link } from "react-router-dom";
import NearbyExperiences from "../components/NearbyExperiences";
import Geolocator from "../components/Geolocator";


//Functional Component 
const HomePage = () => {
  return (
    <div>
      <h3>Welcome to the Dine Mine!</h3>
      <small>Start Here</small>
      <Link to="/maplocations">Show Locations</Link>
      <SearchExperiences />
      <NearbyExperiences />
      <Geolocator />
    </div>
  );
};

export default HomePage;