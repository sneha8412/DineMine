// Reference: https://www.quod.ai/post/how-to-integrate-google-api-into-your-react-app
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { loadGoogleScript } from './components/google/GoogleLogin';
import Home from './components/Home' //check aagin (sneha)
//import SimpleMap from './components/SimpleMap';
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

//import Pages
import HomePage from "./pages"; ///< index.jsx will be automatically imported 
import SearchResultsPage from './pages/SearchResults';
import Experience from './components/Experience';
import Header from './components/Header';
import Footer from './components/Footer';
import Host from './components/Host';
import HostProfile from './components/HostProfile';
import ExperienceForm from './components/forms/ExperienceForm';
import Checkout from './components/Checkout';
import SearchResultsList from './components/SearchResultsList';


function App() {
  
  return (
  
 // BEM
 <div className="app">
 <Router>
   <Header />
   
   <Switch>
     <Route path="/search">
       <SearchResultsList />
     </Route>
     <Route path="/newhost">
       <Host />
     </Route>
     <Route path="/hostprofile">
       <HostProfile />
     </Route>
     <Route path="/experience">
       <Experience />
     </Route>
     <Route path="/newexperience">
       <ExperienceForm />
     </Route>
     <Route path="/checkout">
       <Checkout />
     </Route>
     <Route path="/">
       <Home />
     </Route>
   </Switch>
   
   <Footer />
 </ Router>
</div>
);
}

export default App;
