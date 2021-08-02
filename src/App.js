// Reference: https://www.quod.ai/post/how-to-integrate-google-api-into-your-react-app
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { loadGoogleScript } from './components/GoogleLogin';
import Home from './components/Home' //check aagin (sneha)
import SimpleMap from './components/SimpleMap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

//import Pages
import HomePage from "./pages"; ///< index.jsx will be automatically imported 
import SearchResultsPage from './pages/SearchResults';
import ExperiencePage from './pages/Experience';
import NewHostForm from './pages/NewHostForm';
import SearchForm from './components/SearchForm';
import Header from './components/Header';
import Footer from './components/Footer';
import GoogleAuth from './components/GoogleAuth';
//import Home from './components/Home';

const googleClientId = "153608278319-169t8o4mqbd6lpjhkuqh2lv2n8f2md5r.apps.googleusercontent.com" //process.env.REACT_APP_GOOGLE_CLIENT_ID;

// See: https://console.cloud.google.com/apis/credentials?project=aidacapstone1

function App() {
  
  return (
    // home
    
    <div className="App">
      <Header/>
        <GoogleAuth/>
    
      {/* banner */}
        {/* search */}

      <div className="page-body">
      <SearchForm/>
       <Router>
        {/*All our Routes goes here!*/}
          {/*<Route path="/" component={} />*/}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/searchresults" component={SearchResultsPage} />
          <Route exact path="/experience" component={ExperiencePage} />
       </Router> 
       {/* footer goes here */}
      </div>

      {/* cards */}

       <Footer/>
       
      
    </div>
  );
}

export default App;
