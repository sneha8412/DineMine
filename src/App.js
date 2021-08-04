// Reference: https://www.quod.ai/post/how-to-integrate-google-api-into-your-react-app
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { loadGoogleScript } from './components/GoogleLogin';
import Home from './components/Home' //check aagin (sneha)
import SimpleMap from './components/SimpleMap';
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

//import Pages
import HomePage from "./pages"; ///< index.jsx will be automatically imported 
import SearchResultsPage from './pages/SearchResults';
import Experience from './components/Experience';
// import NewHostForm from './components/NewHostForm';
import SearchForm from './components/SearchForm';
import Header from './components/Header';
import Footer from './components/Footer';
import GoogleAuth from './components/GoogleAuth';
import SearchPage from './components/SearchPage';
import Host from './components/Host';
//import Home from './components/Home';


function App() {
  
  return (
  
 // BEM
 <div className="app">
 <Router>
   <Header />
   
   <Switch>
     <Route path="/search">
       <SearchPage />
     </Route>
     <Route path="/newhost">
       <Host />
     </Route>
     <Route path="/newhost/newexperience">
       <Experience/>
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
