
import React from 'react';
import SimpleMap from '../components/SimpleMap';
import { useLocation } from 'react-router-dom';


const ExperiencePage = (props) => {

  const location = useLocation();

  console.log(location.state.query_url); 

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      Show Experience Details
    </div>
  );
};

export default ExperiencePage;