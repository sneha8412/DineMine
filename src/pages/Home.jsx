/*index.jsx*/
import React from "react";
import SearchExperiences from "../components/SearchExperiences";
//You have to use the link component to link between pages using react router
import { Link } from "react-router-dom";
import NearbyExperiences from "../components/NearbyExperiences";
import Geolocator from "../components/Geolocator";
import ImageUpload from "../components/ImageUpload";
import '../components/Home.css';
import Banner from '../components/Banner'
//import Card from './Card'

//Functional Component 
const HomePage = () => {
  return (
    <div className='home'>
      <Banner />
      <small>Start Here</small>
      <Link to="/maplocations">Show Locations</Link>
      <SearchExperiences />
      <NearbyExperiences />
      <ImageUpload upload_url="http://localhost:5000/images/upload" />
      <Geolocator />
    </div>
  );
};

export default HomePage;